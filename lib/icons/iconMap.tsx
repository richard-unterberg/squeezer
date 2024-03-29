/**
 * App Icons Collection - All icons must be defined here
 * no manual imports in modules needed / wanted
 * todo: "minimize", "maximize", "close" icons
 */
import {
  AudioLines,
  Drum,
  ExternalLink,
  FileVolume2,
  Github,
  LucideProps,
  MagnetIcon,
  MonitorDown,
  Orbit,
  PackageCheck,
  PencilRuler,
  Sailboat,
  Trash2,
} from 'lucide-react'

import { ICON_ID } from './iconID'

type ICON_TYPE = {
  [key in ICON_ID]: {
    component: React.ComponentType<LucideProps> | null
    className?: string
  }
}

const APP_ICON: ICON_TYPE = {
  [ICON_ID.None]: { component: null },
  [ICON_ID.Github]: { component: Github },
  [ICON_ID.ExternalLink]: { component: ExternalLink },
  [ICON_ID.MagnetIcon]: { component: MagnetIcon },
  [ICON_ID.MonitorDown]: { component: MonitorDown },
  [ICON_ID.PackageCheck]: { component: PackageCheck },
  [ICON_ID.PencilRuler]: { component: PencilRuler },
  [ICON_ID.Sailboat]: { component: Sailboat },
  [ICON_ID.Orbit]: { component: Orbit },
  [ICON_ID.AudioLines]: { component: AudioLines },
  [ICON_ID.Drum]: { component: Drum },
  [ICON_ID.FileVolume]: { component: FileVolume2 },
  [ICON_ID.Trash]: { component: Trash2 },
}

export default APP_ICON
