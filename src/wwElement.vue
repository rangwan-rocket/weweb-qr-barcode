<template>
  <div class="qr-barcode-renderer" :style="containerStyle">
    <div class="code-wrapper" :style="alignmentStyle">
      <!-- QR Code Canvas -->
      <canvas 
        v-if="codeType === 'qrcode'" 
        ref="qrCanvas"
        class="code-canvas"
      ></canvas>
      
      <!-- Barcode SVG -->
      <svg 
        v-else 
        ref="barcodeSvg"
        class="code-svg"
      ></svg>
      
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
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';

export default {
  props: {
    uid: { type: String, required: true },
    content: { type: Object, required: true },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  setup(props, { emit }) {
    const qrCanvas = ref(null);
    const barcodeSvg = ref(null);

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

    // Render QR Code
    const renderQRCode = async () => {
      if (!qrCanvas.value || !data.value) return;

      try {
        await QRCode.toCanvas(qrCanvas.value, data.value, {
          width: 200,
          margin: 1,
          color: {
            dark: foregroundColor.value,
            light: backgroundColor.value,
          },
          errorCorrectionLevel: 'M',
        });
      } catch (error) {
        console.error('QR Code render error:', error);
        emit('trigger-event', {
          name: 'render-error',
          event: { error: error.message },
        });
      }
    };

    // Render Barcode
    const renderBarcode = async () => {
      if (!barcodeSvg.value || !data.value) return;

      try {
        JsBarcode(barcodeSvg.value, data.value, {
          format: 'CODE128',
          width: 2,
          height: 80,
          displayValue: false,
          background: backgroundColor.value,
          lineColor: foregroundColor.value,
          margin: 10,
        });
      } catch (error) {
        console.error('Barcode render error:', error);
        emit('trigger-event', {
          name: 'render-error',
          event: { error: error.message },
        });
      }
    };

    // Main render function
    const renderCode = async () => {
      await nextTick();
      if (codeType.value === 'qrcode') {
        await renderQRCode();
      } else {
        await renderBarcode();
      }
    };

    // Watch for all property changes and re-render
    watch(
      () => [
        props.content?.codeType,
        props.content?.data,
        props.content?.backgroundColor,
        props.content?.foregroundColor,
        props.content?.padding,
        props.content?.alignment,
        props.content?.displayCode,
      ],
      () => {
        setTimeout(() => {
          renderCode();
        }, 50);
      },
      { deep: true }
    );

    // Initial render
    onMounted(() => {
      renderCode();
    });

    return {
      props,
      qrCanvas,
      barcodeSvg,
      codeType,
      displayText,
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

.code-canvas,
.code-svg {
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
