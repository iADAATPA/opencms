<template>
  <div id="ia-all">
    <div id="ia-button-container">
      <el-button type="primary" @click="showMenu" id="ia-show-menu" icon="el-icon-view" size="mini" circle></el-button>
    </div>  
    <div id="ia-content" v-show="data.menuVisible">
      <el-row >
        <el-col :span="24">
          <el-form>
            <el-row>
              <el-col :span="24">
                <!-- Engine Selector -->
                <el-form-item label="Please, choose a translation engine" >
                  <el-cascader
                      expand-trigger="hover"
                      @change="engineSelected"
                      :options="data.engines"
                      v-model="data.engine"
                      style="width:100%"
                      placeholder="Domain / Source language / Target langugae">
                  </el-cascader>
                </el-form-item> 
              </el-col>
            </el-row>   
          </el-form> 
        </el-col>
      </el-row> 
    </div>
  </div>
</template>
<script>
  // import storage from './../ext/storage'
  import EditForm from './editForm'
  export default {
    data () {
      return {
        data: {
          apiKey: '',
          accessPoint: '',
          engines: [],
          engine: [],
          menuVisible: false
        }
      }
    },
    computed: { },
    created () {
  
    },
    mounted () {
      chrome.storage.onChanged.addListener(function (changes, namespace) {
        console.log('CHANGED')
        for (let key in changes) {
          var storageChange = changes[key]
          console.log('Storage key "%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
          key, namespace, storageChange.oldValue, storageChange.newValue)
        }
      })
      this.init()
    },
    methods: {
      showMenu () {
        this.data.menuVisible = !this.data.menuVisible
      },
      engineSelected () {
  
      },
      init () {
        this._editForm = new EditForm()
        // this.data.visible = true
        // storage.get(storage.DATA_KEY).then(value => {
        //   if (value) {
        //     const data = JSON.parse(value)
        //     // Allowed  urls
        //     const allowedUrls = data.urls.split(/\r?\n/)
        //     console.log('Translator 2: Allowed URLs', allowedUrls)

        //     // Site Url
        //     const siteUrl = window.location.href
        //     console.log('Translator: Site URL', siteUrl)

        //     // Allowed Site
        //     let isAllowedSite = false
        //     for (const url of allowedUrls) {
        //       if (siteUrl.startsWith(url)) {
        //         isAllowedSite = true
        //         break
        //       }
        //     }

        //     // this.data.visible = true
        //     console.log('Translator: Allowed Site', isAllowedSite)

        //     // Login
        //     const lastLogin = data.lastLogin
        //     const loginExpire = data.loginExpire
        //     const now = Date.now()
        //     if (now - lastLogin > loginExpire) {
        //       console.log('Login has expired')
        //     }
        //   }
        // }).catch(function (err) {
        //   console.log(err)
        // })
      }
  
    }
  
  }
</script>
<style lang="css">

@import './../../node_modules/element-ui/lib/theme-chalk/index.css';
.text-input-wrapper {
	position: relative;
	padding: 0px;
	display: block;
	width:100%;
}

.el-icon-loading-pad {
  margin-right:5px
}
textarea:focus, input:focus{
    outline: none;
}
.translate-button{
  border-top-left-radius:0px !important;
  border-bottom-left-radius:0px !important;
  border-top-right-radius:0px !important;
  border-bottom-right-radius:0px !important;
  position: absolute;
  top:0;
  right:0;
  padding-top:1px;
  padding-bottom:1px;
  padding-left: 7px;
  padding-right: 7px;

}
#ia-button-container {
  position: relative;
}
#ia-show-menu {
  position:absolute;
  top:5px;
  right:5px;
  z-index: 99999;
}
#ia-content {
  background: white;
	font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
	font-weight: 400;
	font-size: 14px;
	color: #000;
	-webkit-font-smoothing: antialiased
}

#ia-content a {
	color: #409EFF;
	text-decoration: none
}


#ia-content a:focus,

#ia-content a:hover {
	color: #66b1ff
}


#ia-content a:active {
	color: #3a8ee6
}


#ia-content h1,
#ia-content h2,
#ia-content h3,
#ia-content h4,
#ia-content h5,
#ia-content h6 {
	color: #606266;
	font-weight: inherit
}

#ia-content h1:first-child,
#ia-content h2:first-child,
#ia-content h3:first-child,
#ia-content h4:first-child,
#ia-content h5:first-child,
#ia-content h6:first-child,
#ia-content p:first-child {
	margin-top: 0
}

#ia-content h1:last-child,
#ia-content h2:last-child,
#ia-content h3:last-child,
#ia-content h4:last-child,
#ia-content h5:last-child,
#ia-content h6:last-child,
#ia-content p:last-child {
	margin-bottom: 0
}

#ia-content h1 {
	font-size: 20px
}

#ia-content h2 {
	font-size: 18px
}

#ia-content h3 {
	font-size: 16px
}

#ia-content h4,
#ia-content h5,
#ia-content h6,
#ia-content p {
	font-size: inherit
}

#ia-content p {
	line-height: 1.8
}

#ia-content sub,
#ia-content sup {
	font-size: 13px
}

#ia-content small {
	font-size: 12px
}

#ia-content hr {
	margin-top: 20px;
	margin-bottom: 20px;
	border: 0;
	border-top: 1px solid #eee
}

</style>