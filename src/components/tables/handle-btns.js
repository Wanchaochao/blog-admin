const btns = {
  delete: (h, params, vm) => {
    return h('Poptip', {
      props: {
        confirm: true,
        title: '你确定要删除吗?'
      },
      on: {
        'on-ok': () => {
          vm.$emit('on-delete', params)
          vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
        }
      }
    }, [
      h('Button', {
        props: {
          type: 'text',
          ghost: true
        }
      }, [
        h('Icon', {
          props: {
            type: 'md-trash',
            size: 18,
            color: '#ff6b60'
          }
        })
      ])
    ])
  },
  edit: (h, params, vm) => {
    return h('Button', {
      props: {
        type: 'text',
        size: 'small'
      },
      on: {
        click: () => {
          vm.$emit('on-edit', params, vm)
        }
      }
    }, [
      h('Button', {
        props: {
          type: 'text',
          ghost: true
        }
      }, [
        h('Icon', {
          props: {
            custom: 'iconfont icon-bianjisekuai',
            size: 18,
            color: '#5da15e'
          }
        })
      ])
    ])
  }
}

export default btns
