<template>
  <div class="qr-barcode-renderer" :style="containerStyle">
    <div class="code-wrapper" :style="alignmentStyle">
      <!-- QR Code Component -->
      <qrcode-vue
        v-if="codeType === 'qrcode'"
        :value="data"
        :size="200"
        :level="'M'"
        :render-as="'canvas'"
        :background="backgroundColor"
        :foreground="foregroundColor"
        class="code-element"
      />
      
      <!-- Barcode Component -->
      <barcode
        v-else
        :value="data"
        :format="'CODE128'"
        :width="2"
        :height="80"
        :display-value="false"
        :background="backgroundColor"
        :line-color="foregroundColor"
        :margin="10"
        class="code-element"
      />
      
      <!-- Display code text underneath -->
      <p 
        v-if="props.content?.displayCode" 
        class="code-text"
        :style="textStyle"
      >
        {{ displayText }}
      </p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import QrcodeVue from 'qrcode.vue';
import Barcode from '@chenfengyuan/vue-barcode';

export default {
  components: {
    QrcodeVue,
    Barcode,
  },
  props: {
    uid: { type: String, required: true },
    content: { type: Object, required: true },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  setup(props, { emit }) {
    /* wwEditor:start */
    const isEditing = computed(() => props.wwEditorState?.isEditing ?? false);
    /* wwEditor:end */

    // Computed properties for reactive updates
    const codeType = computed(() => props.content?.codeType || 'qrcode');
    const data = computed(() => props.content?.data || 'https://www.weweb.io');
    const displayText = computed(() => data.value);
    const alignment = computed(() => props.content?.alignment || 'center');
    const backgroundColor = computed(() => props.content?.backgroundColor || '#FFFFFF');
    const foregroundColor = computed(() => props.content?.foregroundColor || '#000000');

    // Container and alignment styles
    const containerStyle = computed(() => ({
      '--padding': props.content?.padding || '16px',
      '--bg-color': backgroundColor.value,
    }));

    const alignmentStyle = computed(() => ({
      'align-items': alignment.value === 'left' ? 'flex-start' 
                   : alignment.value === 'right' ? 'flex-end' 
                   : 'center',
    }));

    const textStyle = computed(() => ({
      color: foregroundColor.value,
    }));

    return {
      props,
      codeType,
      data,
      displayText,
      backgroundColor,
      foregroundColor,
      containerStyle,
      alignmentStyle,
      textStyle,
      /* wwEditor:start */
      isEditing,
      /* wwEditor:end */
    };
  },
};
</script>

<style lang="scss" scoped>
.qr-barcode-renderer {
  width: 100%;
  min-height: 250px;
  display: flex;
  flex-direction: column;
}

.code-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: var(--padding);
  background-color: var(--bg-color);
  min-height: inherit;
}

.code-element {
  max-width: 100%;
  height: auto;
}

.code-text {
  font-size: 25px;
  font-weight: 500;
  margin: 0;
  padding: 0;
  text-align: center;
  word-break: break-all;
  max-width: 100%;
  font-family: inherit;
}
</style>
