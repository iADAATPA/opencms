<template>
    <div id="xxxx">
    <el-form ref="form">
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
      <el-row>
      <!-- Translate button -->
      </el-row>
    </el-form> 
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
          engine: []
        }
      }
    },
    computed: { },
    created () {
  
    },
    mounted () {
      const that = this
      storage.get(storage.DATA_KEY).then(function (value) {
        console.log(value)
        if (value) {
          const data = JSON.parse(value)
          const apiKey = data.apiKey
          const accessPoint = data.accessPoint
          const engines = data.engines
          // that.data.apiKey = data.apikey
          // that.data.accessPoint = data.accessPoint
          console.log('accessPoint ', accessPoint)
          console.log('apikey ', apiKey)
          console.log('engine 4', engines)
          that.data.engines = engines
          console.log('xxx')
        }
      }).catch(function () {
        console.log('XXXXXXXXXXXXXXx')
      })
    },
    methods: {
      engineSelected () {
  
      }
    }
  }
</script>
<style lang="scss">
#content {
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