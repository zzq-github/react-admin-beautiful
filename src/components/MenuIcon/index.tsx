import React from "react";
import {
  BarChart3,
  Bell,
  Book,
  BookOpen,
  Boxes,
  Briefcase,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Cloud,
  Code,
  Cpu,
  Database,
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  FileCode,
  FileText,
  Flag,
  Folder,
  FolderTree,
  Gauge,
  GitBranch,
  Globe,
  Heart,
  HelpCircle,
  Key,
  Link,
  ListTree,
  Lock,
  Mail,
  Menu,
  MessageSquare,
  Minus,
  MoreVertical,
  Network,
  Pencil,
  Plus,
  Search,
  Server,
  Settings2,
  Shield,
  SlidersHorizontal,
  Star,
  Table2,
  Terminal,
  Trash2,
  Unlock,
  Upload,
  User,
  Users,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

interface MenuIconProps {
  name?: string | null;
  className?: string;
  size?: number;
}

const menuIconRegistry: Record<string, LucideIcon> = {
  dashboard: Gauge,
  home: Gauge,
  example: Boxes,
  system: Settings2,
  settings: Settings2,
  config: Settings2,
  user: User,
  users: Users,
  people: Users,
  peoples: Users,
  role: Shield,
  shield: Shield,
  menu: Menu,
  building: Building2,
  department: Network,
  briefcase: Briefcase,
  book: Book,
  dict: BookOpen,
  sliders: SlidersHorizontal,
  bell: Bell,
  "file-text": FileText,
  globe: Globe,
  server: Server,
  "bar-chart": BarChart3,
  chart: BarChart3,
  cpu: Cpu,
  eye: Eye,
  network: Network,
  database: Database,
  key: Key,
  tree: GitBranch,
  "folder-tree": FolderTree,
  "list-tree": ListTree,
  table: Table2,
  form: ClipboardList,
  folder: Folder,
  "file-code": FileCode,
  message: MessageSquare,
  "message-square": MessageSquare,
  mail: Mail,
  email: Mail,
  search: Search,
  download: Download,
  upload: Upload,
  edit: Pencil,
  trash: Trash2,
  plus: Plus,
  minus: Minus,
  check: Check,
  x: X,
  "chevron-right": ChevronRight,
  "chevron-down": ChevronDown,
  "more-vertical": MoreVertical,
  "external-link": ExternalLink,
  link: Link,
  lock: Lock,
  unlock: Unlock,
  "eye-off": EyeOff,
  star: Star,
  heart: Heart,
  flag: Flag,
  zap: Zap,
  cloud: Cloud,
  terminal: Terminal,
  code: Code,
  "git-branch": GitBranch,
  "git-pull-request": GitBranch,
  "git-commit": GitBranch,
  "git-merge": GitBranch,
  "git-compare": GitBranch,
  "git-branch-plus": GitBranch,
  "git-pull-request-closed": GitBranch,
  "git-fork": GitBranch,
  question: HelpCircle,
  default: Gauge,
};

export const menuIconNames = Object.keys(menuIconRegistry)
  .filter((name) => name !== "default")
  .sort();

export function resolveMenuIconName(name?: string | null): string {
  return name && menuIconRegistry[name] ? name : "default";
}

const MenuIcon: React.FC<MenuIconProps> = ({
  name,
  className,
  size = 16,
}) => {
  const Icon = menuIconRegistry[resolveMenuIconName(name)];

  return (
    <Icon
      size={size}
      strokeWidth={1.75}
      className={className}
      aria-hidden="true"
    />
  );
};

export default MenuIcon;
