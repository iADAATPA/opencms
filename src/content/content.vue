<template>
    <div>
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
<style lang="css">


</style>