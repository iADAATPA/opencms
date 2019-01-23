<template> 
  <div style="width:500px" id="main">
    <!-- Header -->
    <el-container id="header">
      <div id="logo-container"><div id="logo"><img src="./assets/imgs/logo-mt-hub-small.png"></div></div>
      <div id="header-info"><h1>OpenCms translator</h1><p>by mt-hub</p></div>
    </el-container>  
    
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
              <!--  Sign in -->
              <el-button ref="authenticateButton" type="primary" @click="authenticate" :loading="data.authenticateLoading">Log in</el-button>
          </el-form>
        </el-tab-pane>

        <!-- Logged in -->
        <el-tab-pane label="Translate" name="translate" >
          <el-form>  
            <el-form-item label="This plugin works in these URLs:" >
              <el-input type="textarea" :rows="5" placeholder="One url per line" v-model="data.urls">
              </el-input>      
            </el-form-item>            
            <el-button type="primary" @click="saveUrl">Save</el-button>
          </el-form>
        </el-tab-pane>

        <!-- Options -->
        <el-tab-pane label="Options" name="options">
          <el-form ref="optionForm">  
            <p id="options-info">For a better user experience, this plug-in store your api key and the acccess point you used. 
              You can delete these data clicking the "delete button" above.</p>      
            <el-button type="primary" @click="restore" size="small">Delete</el-button>
          </el-form>
        </el-tab-pane>          
      </el-tabs>    
    </div>
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
    // PvWK3Im7srIYaudGh

    let data = {
      // Tabs
      activeTab: 'login',
  
      accessPoint: 'https://mt-hub.eu/api',
      apiKey: 'PvWK3Im7srIYaudGh',

      // Auth loading
      authenticateLoading: false,

      lastLogin: null,
      loginExpire: 15 * 60 * 1000,

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

        // That is this
        const that = this
  
        // Login
        const accessPoint = this.data.accessPoint
        const apiKey = this.data.apiKey
        const user = new User(apiKey, accessPoint)
        user.auth().then(u => {
          // Close loading animation
          this.data.authenticateLoading = false
  
          if (user.isAuthenticated()) {
            // set engines
            that.data.engines = user.getEngineCascader()
            that.data.lastLogin = Date.now()
            this.data.activeTab = 'translate'
            const dataJson = JSON.stringify(this.data)

            storage.set(storage.DATA_KEY, dataJson).then(function () {
              // Tab
              that.$message.success('You have successfully logged in')
            }).catch(function (err) {
              console.log(err)
              that.data.activeTab = 'login'
              that.$message.error('Oops, error saving your data')
            })
          } else {
            that.$message.error('Oops, authentication error. please, retry..')
          }
        })
      },

      init () {
        const that = this
        storage.get(storage.DATA_KEY).then(function (value) {
          if (value) {
            const data = JSON.parse(value)
            const date = parseInt(data.lastLogin)
            const now = Date.now()
            if (now - date < data.loginExpire) {
              // Login is ok we save the date
              data.lastLogin = now
              const dataJson = JSON.stringify(data)
              storage.set(storage.DATA_KEY, dataJson).then(function () {
                that.data = data
              })
            } else {
              that.data = getDefault()
              that.data.accessPoint = data.accessPoint
              that.data.apiKey = data.apiKey
            }
          } else {
            that.data = getDefault()
          }
        }).catch(function (err) {
          console.log(err)
          that.data = getDefault()
        })
      },
      saveUrl () {
        const that = this
        const dataJson = JSON.stringify(this.data)
        storage.set(storage.DATA_KEY, dataJson).then(function () {
          that.$message.success('Urls saved')
        })
      },
      restore () {},

      // Clear a storage key
      clearStorage (key) {
        // console.log('Delete storage', key)
        // if (localStorage.hasOwnProperty(key)) {
        //   localStorage.removeItem(key)
        // }
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
    padding-left: 5px;
    padding-top:3px
  }

  #header-info p {
    margin: 3px 0 0 0
  }

  h1 {
    font-size:16px;    
    color:#3B3B3B;
    font-weight:bold;
    margin:0;
    line-height: 16px;
    text-transform: uppercase;

   
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

  #options-info {
    margin-top:0
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
    width: 200px;
    padding-top:19px;
    padding-left:15px;
  }

  #logo-ce {
    width:100px;
    height: auto;
  }

</style>