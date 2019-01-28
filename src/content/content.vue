<template>
  <div id="ia-all">
    <div id="ia-button-container">
      <el-button type="primary" @click="showContent" id="ia-show-content" :icon="data.icon" size="mini" circle></el-button>
    </div> 
    <div id="ia-content" v-show="data.visible">
      <el-card class="box-card" id="ia-content-card" shadow="never" >
        <!-- Card header-->
        <div slot="header" class="clearfix">
          <div id="ia-logo"><img src="./assets/imgs/logo-mt-hub-small.png"></div>
          <div id="ia-header-info"><h1>OpenCms translator</h1><p>by <a href="http://pangeamt.com" target="_blank">pangeamt</a> for <a href="https://mt-hub.eu/" target="_blank">mt-hub</a></p></div>
        </div>
        <el-form  id="translate-form" label-position="top">         
          <el-form-item label="Translation engine">    
             <!-- Engine Selector -->        
            <el-cascader
                expand-trigger="hover"
                @change="engineSelected"
                :options="data.engines"
                v-model="data.engine"         
                placeholder="Select an engine"
                style="width:100%">
            </el-cascader>
          </el-form-item>      


        </el-form>
      <el-form  id="post-edit-form">
          <h2 id="ia-post-editor-title">Post edition</h2>
          <el-form-item label="Source text" >
            <el-input
              type="textarea"
              :rows="2"
              placeholder="Source text"
              v-model="data.source">
            </el-input>
          </el-form-item>
          <el-form-item label="Target text" >
            <el-input
              type="textarea"
              :rows="2"
              placeholder="Target Text"
              v-model="data.target">
            </el-input>
          </el-form-item>
          <el-button type="success" @click="valid">Valid</el-button>
          <el-button type="primary" @click="reject">Reject</el-button>
        </el-form>    
      </el-card> 
    </div>
    
 
  </div>
</template>
<script>
  import $ from 'jquery'
  import InputText from './input-text'
  import InputTextarea from './input-textarea'
  import InputHTML from './input-html'
  import storage from './../ext/storage'

  export default {
    data () {
      return {
        data: {
          icon: 'el-icon-view',
          engines: [],
          engine: [],
          visible: false,
          source: '',
          target: ''
        }
      }
    },
    computed: { },
    created () {
  
    },
    mounted () {
      this.init()
    },
    methods: {

      // Handle show hide
      showContent () {
        if (this.data.visible) {
          $('body').css('padding-right', '0')
          this.data.icon = 'el-icon-view'
        } else {
          $('body').css('padding-right', '500px')
          this.data.icon = 'el-icon-close'
        }
        this.data.visible = !this.data.visible
        this.saveData()
      },
  
      engineSelected () {
        this.saveData()
      },
      init () {
        const form = $('#EDITOR')
        this.textInputs = []
        this.textareas = []
        this.htmls = []
  
        const that = this
        let k = 0
  
        // Text inputs
        const inputs = form.find('input:text')
        inputs.each(function () {
          const textInput = new InputText($(this), k, that)
          that.textInputs.push(textInput)
          k++
        })

        // Textareas
        const textareas = form.find('textarea')
        textareas.each(function () {
          const textarea = new InputTextarea($(this), k, that)
          that.textareas.push(textarea)
          k++
        })

        // HTML editors
        const editors = form.find('td.cmsTinyMCE')
        editors.each(function () {
          const editor = new InputHTML($(this), k, that)
          that.htmls.push(editor)
          k++
        })
  
        storage.get(storage.DATA_KEY).then(value => {
          if (value) {
            this.storedData = JSON.parse(value)
            this.data.engines = this.storedData.engines
  
            storage.get(storage.CONTENT_KEY).then(value => {
              const contentStoredData = JSON.parse(value)
              this.data.icon = contentStoredData.icon
              this.data.visible = contentStoredData.visible
              if (this.data.visible === true) {
                $('body').css('padding-right', '500px')
              }
              this.data.engine = contentStoredData.engine
            })
          }
        })
      },
      translate (input) {
        // Set currentInput
        this.currentInput = input
        console.log('current input', this.currentInput)
        const toTranslate = input.getToTranslate()
        console.log('Translator: translate', toTranslate)

        const engineSelected = this.data.engine
        if (engineSelected.length === 3) {
          const domain = engineSelected[0]
          const srcLang = engineSelected[1]
          const tgtLang = engineSelected[2]

          // Update post editor
          this.data.source = toTranslate

          // Url
          const url = this.storedData.accessPoint + '/dev/translate'

          // Create request body
          let body = {
            source: srcLang,
            target: tgtLang,
            token: this.storedData.apiKey
          }
  
          if (domain != null) {
            body['domain'] = domain
          }
          body['segments'] = [toTranslate]
  
          body = JSON.stringify(body)
          // Create request options
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: body
          }
  
          // Send request
          fetch(url, options).then(response => {
            if (response.ok) {
              response.json().then(json => {
                if (json.success) {
                  json.data.segments.forEach((segment) => {
                    console.log('translation ok')
                    const translation = segment.translation
                    input.setValue(translation)
                    this.data.target = translation
                    input.removeLoading()
                  })
                } else {
                  input.removeLoading()
                }
              }).catch(err => {
                input.removeLoading()
                console.log(err)
              })
            } else {
              input.removeLoading()
              console.log('response not ok')
            }
          }).catch(err => {
            input.removeLoading()
            console.log(err)
          // TODO
          })
        }
      },
      valid () {
        console.log('valid', this.currentInput)
        this.currentInput.setValue(this.data.target)
      },
      reject () {
        this.currentInput.setValue(this.data.source)
      },

      saveData () {
        const dataJson = JSON.stringify(this.data)
        storage.set(storage.CONTENT_KEY, dataJson).then(() => {
          console.log('savedData')
        })
      }
    }
  }
</script>
<style lang="css">

@import './../../node_modules/element-ui/lib/theme-chalk/index.css';

#ia-all {
  position: fixed;
  top: 0px;
  bottom:0px;
  right:0px;
  z-index:100;
}

#ia-show-content {
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
  -webkit-font-smoothing: antialiased;
  position: absolute;
  top:0;
  bottom:0;
  right:0;
  background:white;
  width:500px;
}

#ia-content-card {
  border:none
}

#ia-logo {
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background-color:#3B3B3B;
  padding:3px;
  text-align: center;
  display: block;
  line-height: 0;
  float:left;
  width: 30px;
  margin-right:8px;
  overflow: hidden;
}

#ia-logo img {
  width:30px;
  height: auto;
}

#ia-header-info h1 {
  margin:3px 0 0 0 !important;
  font-size: 18px !important;
  line-height: 18px !important;
  color: #3B3B3B !important;
  font-weight: bold !important;

}
#ia-header-info p {
  margin:0 !important;
  line-height: 1.2 !important 
}

#ia-post-editor-title {
  border-bottom: 1px solid #ebeef5;
  margin:30px -20px 20px -20px !important;
  padding: 0 20px 5px 20px
}


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




#ia-content p, 
#ia-content td, 
#ia-content div, 
#ia-content span {
	font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
	font-weight: 400;
	font-size: 14px;
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