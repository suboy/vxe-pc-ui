import { PropType, defineComponent, h } from 'vue'
import { getI18n } from '@vxe-ui/core'
import { WidgetVxeDatePickerFormObjVO } from './vxe-date-picker-data'
import { useWidgetName } from '../../form-design/src/use'
import VxeFormComponent from '../../form/src/form'
import VxeFormItemComponent from '../../form/src/form-item'
import VxeInputComponent from '../../input/src/input'
import VxeSwitchComponent from '../../switch/src/switch'

import type { VxeGlobalRendererHandles } from '../../../types'

export const WidgetVxeDatePickerFormComponent = defineComponent({
  props: {
    renderOpts: {
      type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetFormViewOptions>,
      default: () => ({})
    },
    renderParams: {
      type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetFormViewParams<WidgetVxeDatePickerFormObjVO>>,
      default: () => ({})
    }
  },
  emits: [],
  setup (props) {
    const { computeKebabCaseName } = useWidgetName(props)
    // const { renderDefaultValueFormItem } = useWidgetPropDefaultValue(props)

    return () => {
      const { renderParams } = props
      const { widget } = renderParams
      const kebabCaseName = computeKebabCaseName.value

      return h(VxeFormComponent, {
        class: ['vxe-form-design--widget-render-form-wrapper', `widget-${kebabCaseName}`],
        vertical: true,
        span: 24,
        titleBold: true,
        data: widget.options
      }, {
        default () {
          return [
            h(VxeFormItemComponent, {
              title: getI18n('vxe.formDesign.widgetProp.name')
            }, {
              default () {
                return h(VxeInputComponent, {
                  modelValue: widget.title,
                  'onUpdate:modelValue' (val) {
                    widget.title = val
                  }
                })
              }
            }),
            h(VxeFormItemComponent, {
              title: getI18n('vxe.formDesign.widgetProp.placeholder'),
              field: 'placeholder',
              itemRender: { name: 'VxeInput' }
            }),
            // renderDefaultValueFormItem(),
            h(VxeFormItemComponent, {
              title: getI18n('vxe.formDesign.widgetProp.required')
            }, {
              default () {
                return h(VxeSwitchComponent, {
                  modelValue: widget.required,
                  'onUpdate:modelValue' (val) {
                    widget.required = val
                  }
                })
              }
            })
          ]
        }
      })
    }
  }
})
