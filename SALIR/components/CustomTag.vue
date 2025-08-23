<template>
  <view 
    :class="tagClass" 
    :style="tagStyle"
    @click="handleClick"
  >
    <slot></slot>
    <van-icon 
      v-if="closeable" 
      name="cross" 
      custom-class="van-tag__close" 
      @click="handleClose"
    />
  </view>
</template>

<script>
import VanIcon from '@/wxcomponents/vant/dist/icon/index.vue'

export default {
  name: 'CustomTag',
  components: {
    'van-icon': VanIcon
  },
  props: {
    size: {
      type: String,
      default: ''
    },
    mark: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    textColor: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'default'
    },
    closeable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tagClass() {
      const classes = ['van-tag']
      
      if (this.type) classes.push(`van-tag--${this.type}`)
      if (this.size) classes.push(`van-tag--${this.size}`)
      if (this.mark) classes.push('van-tag--mark')
      if (this.plain) classes.push('van-tag--plain')
      if (this.round) classes.push('van-tag--round')
      
      return classes.join(' ')
    },
    tagStyle() {
      const style = {}
      
      if (this.color && !this.plain) {
        style.backgroundColor = this.color
      }
      
      if (this.textColor || (this.color && this.plain)) {
        style.color = this.textColor || this.color
      }
      
      return style
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    },
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.van-tag {
  align-items: center;
  border-radius: 2px;
  color: #fff;
  display: inline-flex;
  font-size: 12px;
  line-height: 16px;
  padding: 0 4px;
  position: relative;
}

.van-tag--default {
  background-color: #969799;
}

.van-tag--default.van-tag--plain {
  color: #969799;
}

.van-tag--danger {
  background-color: #ee0a24;
}

.van-tag--danger.van-tag--plain {
  color: #ee0a24;
}

.van-tag--primary {
  background-color: #1989fa;
}

.van-tag--primary.van-tag--plain {
  color: #1989fa;
}

.van-tag--success {
  background-color: #07c160;
}

.van-tag--success.van-tag--plain {
  color: #07c160;
}

.van-tag--warning {
  background-color: #ff976a;
}

.van-tag--warning.van-tag--plain {
  color: #ff976a;
}

.van-tag--plain {
  background-color: #fff;
}

.van-tag--plain:before {
  border: 1px solid;
  border-radius: inherit;
  bottom: 0;
  content: "";
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
}

.van-tag--medium {
  padding: 2px 6px;
}

.van-tag--large {
  border-radius: 4px;
  font-size: 14px;
  padding: 4px 8px;
}

.van-tag--mark {
  border-radius: 0 999px 999px 0;
}

.van-tag--mark:after {
  content: "";
  display: block;
  width: 2px;
}

.van-tag--round {
  border-radius: 999px;
}

.van-tag__close {
  margin-left: 2px;
  min-width: 1em;
}
</style>
