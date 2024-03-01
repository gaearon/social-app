import React from 'react'
import {View} from 'react-native'
import {useLingui} from '@lingui/react'
import {msg} from '@lingui/macro'

import {useLabelStrings} from '#/lib/moderation/useLabelStrings'

import {useTheme, atoms as a} from '#/alf'
import {Text} from '#/components/Typography'
import * as ToggleButton from '#/components/forms/ToggleButton'

export function ModerationLabelPref({
  label,
  disabled,
}: {
  label: string
  disabled?: boolean
}) {
  const t = useTheme()
  const {_} = useLingui()
  const allLabelStrings = useLabelStrings()
  const labelStrings = allLabelStrings[label] || {
    general: {
      name: label,
      description: `Labeled "${label}"`,
    },
  }

  // TODO add onChange behavior when mod prefs are updated

  const labelOptions = {
    hide: _(msg`Hide`),
    warn: _(msg`Warn`),
    show: _(msg`Ignore`),
  }

  return (
    <View
      style={[
        a.flex_row,
        a.justify_between,
        a.gap_sm,
        a.py_md,
        a.pl_lg,
        a.pr_md,
        a.align_center,
      ]}>
      <View style={[a.gap_xs, {width: '50%'}]}>
        <Text style={[a.font_bold]}>{labelStrings.general.name}</Text>
        <Text style={[t.atoms.text_contrast_medium, a.leading_snug]}>
          {labelStrings.general.description}
        </Text>
      </View>
      <View style={[a.justify_center, {minHeight: 35}]}>
        {!disabled && (
          <ToggleButton.Group
            label={_(
              msg`Configure content filtering setting for category: ${labelStrings.general.name.toLowerCase()}`,
            )}
            values={['hide']}
            onChange={() => {}}>
            <ToggleButton.Button name="show" label={labelOptions.show}>
              {labelOptions.show}
            </ToggleButton.Button>
            <ToggleButton.Button name="warn" label={labelOptions.warn}>
              {labelOptions.warn}
            </ToggleButton.Button>
            <ToggleButton.Button name="hide" label={labelOptions.hide}>
              {labelOptions.hide}
            </ToggleButton.Button>
          </ToggleButton.Group>
        )}
      </View>
    </View>
  )
}
