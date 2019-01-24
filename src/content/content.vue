<template>
  <div id="content" v-show="data.visible">
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
</template>
<script>
  import storage from './../ext/storage'
  
  export default {
    data () {
      return {
        data: {
          apiKey: '',
          accessPoint: '',
          engines: [],
          engine: [],
          visible: false
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
      engineSelected () {
  
      },
      init () {
        storage.get(storage.DATA_KEY).then(value => {
          if (value) {
            const data = JSON.parse(value)
            // Allowed  urls
            const allowedUrls = data.urls.split(/\r?\n/)
            console.log('Translator: Allowed URLs', allowedUrls)

            // Site Url
            const siteUrl = window.location.href
            console.log('Translator: Site URL', siteUrl)

            // Allowed Site
            let isAllowedSite = false
            for (const url of allowedUrls) {
              if (siteUrl.startsWith(url)) {
                isAllowedSite = true
                break
              }
            }

            // this.data.visible = true
            console.log('Translator: Allowed Site', isAllowedSite)

            // Login
            const lastLogin = data.lastLogin
            const loginExpire = data.loginExpire
            const now = Date.now()
            if (now - lastLogin > loginExpire) {
              console.log('Login has expired')
            }
          }
        }).catch(function (err) {
          console.log(err)
        })
      }
  
    }
  
  }
</script>
<style lang="css">

@import './../../node_modules/element-ui/lib/theme-chalk/index.css';
#content {
  position: absolute;
  top:0;
  height:100px;
  width:100%;
  background: white;

	font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
	font-weight: 400;
	font-size: 14px;
	color: #000;
	-webkit-font-smoothing: antialiased
}

#content a {
	color: #409EFF;
	text-decoration: none
}


#content a:focus,

#content a:hover {
	color: #66b1ff
}


#content a:active {
	color: #3a8ee6
}


#content h1,
#content h2,
#content h3,
#content h4,
#content h5,
#content h6 {
	color: #606266;
	font-weight: inherit
}

#content h1:first-child,
#content h2:first-child,
#content h3:first-child,
#content h4:first-child,
#content h5:first-child,
#content h6:first-child,
#content p:first-child {
	margin-top: 0
}

#content h1:last-child,
#content h2:last-child,
#content h3:last-child,
#content h4:last-child,
#content h5:last-child,
#content h6:last-child,
#content p:last-child {
	margin-bottom: 0
}

#content h1 {
	font-size: 20px
}

#content h2 {
	font-size: 18px
}

#content h3 {
	font-size: 16px
}

#content h4,
#content h5,
#content h6,
#content p {
	font-size: inherit
}

#content p {
	line-height: 1.8
}

#content sub,
#content sup {
	font-size: 13px
}

#content small {
	font-size: 12px
}

#content hr {
	margin-top: 20px;
	margin-bottom: 20px;
	border: 0;
	border-top: 1px solid #eee
}

</style>