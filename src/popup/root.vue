<template> 
  <div style="width:500px" id="main">
    <!-- Header -->
      <el-row id="header">
            <el-col :span="12">
              <div id="logo-container"><div id="logo"><img src="./assets/imgs/logo-mt-hub-small.png"></div></div>
              <div id="header-info"><h1>OpenCms translator</h1><p>by <a href="http://pangeamt.com" target="_blank">pangeamt</a> for <a href="https://mt-hub.eu/" target="_blank">mt-hub</a></p></div>
            </el-col>
          <el-col :span="12">
            <div id="header-right">
              <el-button-group>
                <el-button  size="mini" @click="logout" v-show="this.data.loggedIn">log out</el-button>
                <el-button icon="el-icon-close"  size="mini" @click="closeWindow"></el-button>
              </el-button-group>                   
            </div>
          </el-col>
      </el-row>  
    
    <!-- Tabs -->
    <div id="tabs">    
      <el-tabs v-model="data.activeTab" type="border-card">
        <!-- Login Form -->
        <el-tab-pane label="Log in" name="login" >
          <el-form>
              <!--  Access point -->
              <el-form-item label="Access point">
                <el-input v-model="data.accessPoint" placeholder="Enter your access point">
                    <template slot="prepend">https://</template>
                </el-input>            
              </el-form-item>
              <!--  Api key  -->
              <el-form-item label="API key" >
                <el-input v-model="data.apiKey" placeholder="Enter your API key" type="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="data.rememberme">Remember me</el-checkbox>
              </el-form-item>
              <!--  Sign in -->
              <el-button ref="authenticateButton" type="primary" @click="authenticate" :loading="data.authenticateLoading">Log in</el-button>
          </el-form>
        </el-tab-pane>

        <!-- Translate -->
        <el-tab-pane label="Translate" name="translate" :disabled="!data.loggedIn">
          <el-form>  
            <el-form-item label="List of allowed URLs. One per line" >
              <el-input type="textarea" :rows="5" placeholder="One url per line" v-model="data.urls">
              </el-input>      
            </el-form-item>            
            <el-button type="primary" @click="saveUrl">Save</el-button>
          </el-form>
        </el-tab-pane>           
      </el-tabs>    
    </div>
    <!-- Footer-->
    <el-row>
      <el-col :span="24">
        <el-card id="credits-card" :body-style="{ padding: '15px' }">
          <el-container>
            <div id="logo-ce-container"><img src="./assets/imgs/logo_ce-en-pantone-hr.jpg" id="logo-ce" /></div>
            <div id="credits">
              This project has received funding from the European Comission
            </div>
          </el-container> 
        </el-card>
      </el-col>
    </el-row>       
  </div>  
</template>
<script>
  import storage from './../ext/storage'
  import User from './user'

  function getDefault () {
    let data = {
      // Tabs
      activeTab: 'login',
      // Login in
      accessPoint: 'https://mt-hub.eu/api',
      apiKey: '',
      // Auth
      authenticateLoading: false,
      loggedIn: false,
      lastLogin: 0,
      loginExpire: 24 * 60 * 60 * 1000, // 24 hours
      rememberme: true,
      // Urls
      urls: ''
    }
    return data
  }

  export default {
    data () {
      return {
        data: getDefault()
      }
    },
    computed: { },
    created () {
      this.init()
    },
    mounted () { },
    methods: {
      // Sign in
      authenticate () {
        // Loading animation for the log in button
        this.data.authenticateLoading = true
  
        // Get credentials
        const accessPoint = this.data.accessPoint
        const apiKey = this.data.apiKey

        // Auth
        const user = new User(apiKey, accessPoint)
        user.auth().then(() => {
          // Close loading animation
          this.data.authenticateLoading = false
  
          if (user.isAuthenticated()) {
            // set engines
            this.data.engines = user.getEngineCascader()
            this.data.lastLogin = Date.now()
            this.data.activeTab = 'translate'
  
            const dataJson = JSON.stringify(this.data)
            storage.set(storage.DATA_KEY, dataJson).then(() => {
              // Tab
              this.$message.success('You have successfully logged in')
            }).catch(err => {
              console.log(err)
              this.data.activeTab = 'login'
              this.$message.error('Oops, error saving your data')
            })
          } else {
            this.$message.error('Oops, authentication error. Please, retry...')
          }
        })
      },

      init () {
        storage.get(storage.DATA_KEY).then(value => {
          if (value) {
            const storedData = JSON.parse(value)
            const date = parseInt(storedData.lastLogin)
            const now = Date.now()
            if (now - date < storedData.loginExpire) {
              this.data = storedData
            } else {
              this.data = getDefault()
              if (storedData.rememberme) {
                this.data.accessPoint = storedData.accessPoint
                this.data.apiKey = storedData.apiKey
                this.data.urls = storedData.urls
              }
              this.data.rememberme = storedData.rememberme
            }
          } else {
            this.data = getDefault()
          }
          // logged in
          this.checkLoggedIn()
          setInterval(() => {
            this.checkLoggedIn()
          }, 1000)
        }).catch(function (err) {
          console.log(err)
          this.data = getDefault()
        })
      },

      checkLoggedIn () {
        const loggedIn = (Date.now() - this.data.lastLogin < this.data.loginExpire)
        this.data.loggedIn = loggedIn
        if (!loggedIn) {
          this.data.activeTab = 'login'
        }
      },
  
      saveUrl () {
        const dataJson = JSON.stringify(this.data)
        storage.set(storage.DATA_KEY, dataJson).then(() => {
          this.$message.success('Urls saved successfully')
        })
      },
  
      logout () {
        storage.remove(storage.DATA_KEY).then(() => {
          if (this.data.rememberme) {
            const data = getDefault()
            data.accessPoint = this.data.accessPoint
            data.apiKey = this.data.apiKey
            data.urls = this.data.urls
            data.rememberme = this.data.rememberme
            const dataJson = JSON.stringify(data)
            storage.set(storage.DATA_KEY, dataJson).then(() => {
              window.close()
            })
          } else {
            const data = getDefault()
            const dataJson = JSON.stringify(data)
            storage.set(storage.DATA_KEY, dataJson).then(() => {
              window.close()
            })
          }
        })
      },

      closeWindow () {
        window.close()
      }
    }
  }
</script>
<style lang="css">
  #header {
    margin-bottom:8px;
  }
  /* Header */
  #logo-container {
    float:left;
    padding-left:2px
  }
  #header-info {
    float:left;
    padding-left: 8px;
    padding-top:5px
  }

  #header-info p {
    line-height:16px;
    margin:0
  }

  h1 {   
    font-size:18px;    
    color:#3B3B3B;
    font-weight:bold;
    margin:0;
     margin-top:2px;
    line-height: 18px;
    text-transform: capitalize;  
  }  

  #logo {
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    background-color:#3B3B3B;
    padding:3px;
    text-align: center;
    display: block;
    line-height: 0;
    overflow: hidden;
  }

  #logo img {
    width:36px;
    height: auto;
  }

  #header-right {
      float:right
  }
  
  /* Cascader */
  .el-cascader-menu__item--extensible:after {
    right: 10px !important;
  }

  .el-cascader-menu {
     min-width: 150px !important;
  }

  .el-cascader-menu__item {
    padding-left:15px !important;
    padding-right:15px !important;
  }  

  /* Footer */
  #credits-card {
    margin-top:10px
  }

  #logo-ce-container {
    float: left;
  }

  #credits {
    float:left;
    margin-left:15px;
    border-bottom-left-radius: 4px;
    background-color: #ecf8ff;
    border-bottom-right-radius:4px;
    border-left-color: rgb(80, 191, 255);
    border-left-style:solid;
    border-left-width:5px;
    border-top-left-radius:4px;
    border-top-right-radius:4px;
    display:block;
    font-family:"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif;
    padding: 16px 16px;
  }

  #logo-ce {
    width:100px;
    height: auto;
  }

</style>