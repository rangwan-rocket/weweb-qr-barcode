export default {
  editor: {
    label: {
      en: "QR & Barcode Renderer",
    },
    icon: "fontawesome/solid/qrcode",
  },
  properties: {
    codeType: {
      label: { en: "Code Type" },
      type: "TextSelect",
      section: "settings",
      options: {
        options: [
          { value: "qrcode", label: "QR Code" },
          { value: "barcode", label: "Barcode" },
        ],
      },
      defaultValue: "qrcode",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Valid values: qrcode | barcode",
      },
      /* wwEditor:end */
    },
    data: {
      label: { en: "Data" },
      type: "Text",
      section: "settings",
      bindable: true,
      defaultValue: "https://www.weweb.io",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "The data to encode in the QR code or barcode",
      },
      propertyHelp: {
        en: "Enter the data to be encoded. For QR codes: any text or URL. For barcodes: numeric data recommended.",
      },
      /* wwEditor:end */
    },
    alignment: {
      label: { en: "Alignment" },
      type: "TextSelect",
      section: "settings",
      options: {
        options: [
          { value: "left", label: "Left" },
          { value: "center", label: "Center" },
          { value: "right", label: "Right" },
        ],
      },
      defaultValue: "center",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Valid values: left | center | right",
      },
      /* wwEditor:end */
    },
    displayCode: {
      label: { en: "Display Code" },
      type: "OnOff",
      section: "settings",
      defaultValue: true,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "boolean",
        tooltip: "Show the underlying code text beneath the QR/barcode",
      },
      propertyHelp: {
        en: "Toggle to show or hide the data text underneath the code",
      },
      /* wwEditor:end */
    },
    padding: {
      label: { en: "Padding" },
      type: "Length",
      section: "settings",
      defaultValue: "16px",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Padding around the code (e.g., 16px, 1rem)",
      },
      /* wwEditor:end */
    },
    backgroundColor: {
      label: { en: "Background Color" },
      type: "Color",
      section: "settings",
      defaultValue: "#FFFFFF",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Background color of the code",
      },
      /* wwEditor:end */
    },
    foregroundColor: {
      label: { en: "Foreground Color" },
      type: "Color",
      section: "settings",
      defaultValue: "#000000",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Color of the QR code or barcode pattern",
      },
      /* wwEditor:end */
    },
  },
  triggerEvents: [
    {
      name: "render-error",
      label: { en: "On render error" },
      event: {
        error: "",
      },
      default: true,
    },
  ],
};
