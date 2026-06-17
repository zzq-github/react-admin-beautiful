import React from "react";
import {
  AppWindow,
  BarChart3,
  Bell,
  Book,
  BookOpenCheck,
  Briefcase,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  Cloud,
  Code,
  Cog,
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
  FormInput,
  GitBranch,
  Globe,
  Heart,
  HelpCircle,
  Key,
  LayoutDashboard,
  Link,
  ListTree,
  Lock,
  Mail,
  MenuSquare,
  MessageSquare,
  Minus,
  MoreVertical,
  Network,
  Pencil,
  Plus,
  Search,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  TableProperties,
  Terminal,
  Trash2,
  Unlock,
  Upload,
  UserCog,
  Users2,
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
  dashboard: LayoutDashboard,
  home: LayoutDashboard,
  example: AppWindow,
  examples: AppWindow,
  system: Cog,
  settings: Cog,
  config: Cog,
  user: UserCog,
  users: Users2,
  people: Users2,
  peoples: ShieldCheck,
  role: ShieldCheck,
  shield: ShieldCheck,
  menu: MenuSquare,
  "menu-square": MenuSquare,
  building: Building2,
  department: Building2,
  dept: Building2,
  organization: Network,
  briefcase: Briefcase,
  book: Book,
  dict: BookOpenCheck,
  dictionary: BookOpenCheck,
  sliders: SlidersHorizontal,
  theme: SlidersHorizontal,
  tokens: SlidersHorizontal,
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
  table: TableProperties,
  form: FormInput,
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
  default: LayoutDashboard,
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
    <span
      className={className}
      style={{ "--menu-icon-size": `${size}px` } as React.CSSProperties}
      aria-hidden="true"
    >
      <Icon size={size} strokeWidth={2.15} />
    </span>
  );
};

export default MenuIcon;
