<template>
    <div v-if="searchable && searchPlace === 'top'" class="search-con search-con-top">
        <Select v-model="searchKey" class="search-col">
            <Option v-for="item in columns" v-if="" :value="item.key"
                    :key="`search-col-${item.key}`">{{ item.title }}
            </Option>
        </Select>
        <Input @on-change="handleClear" clearable placeholder="输入关键字搜索" class="search-input"
               v-model="searchValue"/>
        <Button @click="handleSearch" class="search-btn" type="primary">
            <Icon type="search"/>&nbsp;&nbsp;搜索
        </Button>
    </div>
</template>
<script>

export default {
  name: 'table-search',
  props: {

  },
  data () {
    return {
      searchValue: '',
      searchKey: ''
    }
  }
}
</script>
