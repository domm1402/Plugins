import Page from '@valenced/components/Page'
import { Design } from '@valenced/discord/design'
import { ScrollView, View, Image } from 'react-native'
import type { ComponentProps } from 'react'
import type { PluginSettingsComponent } from '@valenced/plugins/types'
import type { BadgeItem } from './badges'
import { DEFAULT_BADGES } from './badges'

type Settings = { badges: BadgeItem[] }
type Props = ComponentProps<PluginSettingsComponent<{ jsonStorage: Settings }>>

export default function SettingsComponent({ api: { jsonStorage: storage } }: Props) {
  const settings = storage.use() ?? { badges: [] }
  const officialIds = new Set(DEFAULT_BADGES.map(badge => badge.id))
  // Discard old random/custom entries saved by earlier versions.
  const badges = (settings.badges ?? []).filter(item => officialIds.has(item.id))
  if (badges.length !== (settings.badges ?? []).length) {
    storage.set({ badges })
  }

  const togglePreset = (badge: BadgeItem) => {
    const exists = badges.some(item => item.id === badge.id)
    storage.set({ badges: exists ? badges.filter(item => item.id !== badge.id) : [...badges, badge] })
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 32 }}>
      <Page>
        <Design.TableRowGroup title="Your selected Discord badges">
          <Design.Text>{badges.length} official badge designs selected. These are local visual previews only and do not grant genuine Discord account badges.</Design.Text>
          {badges.map(badge => (
            <View key={badge.id} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 7, gap: 10 }}>
              <Image source={{ uri: badge.image }} style={{ width: 32, height: 32, borderRadius: 7 }} />
              <View style={{ flex: 1 }}><Design.Text>{badge.label}</Design.Text></View>
              <Design.Button text="Remove" onPress={() => storage.set({ badges: badges.filter(item => item.id !== badge.id) })} />
            </View>
          ))}
          {badges.length === 0 ? <Design.Text>No badges selected. Choose official badge artwork below.</Design.Text> : null}
        </Design.TableRowGroup>

        <Design.TableRowGroup title="Official Discord badge artwork">
          <Design.Text>Only known Discord badge designs are listed. Tap Add to show one in your Valenced profile.</Design.Text>
          {DEFAULT_BADGES.map(badge => {
            const selected = badges.some(item => item.id === badge.id)
            return (
              <View key={badge.id} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, gap: 8 }}>
                <Image source={{ uri: badge.image }} style={{ width: 30, height: 30, borderRadius: 6 }} />
                <View style={{ flex: 1 }}><Design.Text>{badge.label}</Design.Text></View>
                <Design.Button text={selected ? 'Added' : 'Add'} onPress={() => togglePreset(badge)} />
              </View>
            )
          })}
        </Design.TableRowGroup>
      </Page>
    </ScrollView>
  )
}
