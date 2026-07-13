import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Bus,
  Camera,
  CarFront,
  Check,
  Clock3,
  ChevronLeft,
  ChevronRight,
  Compass,
  Copy,
  Mail,
  MapPin,
  MapPinned,
  MessageCircle,
  Mountain,
  Pause,
  Phone,
  Play,
  TreePine,
  UsersRound,
   
} from "lucide-react";

import {
  FaFacebookF as FacebookIcon,
  FaInstagram as InstagramIcon,
  FaWhatsapp as WhatsAppIcon,
  FaYoutube as YouTubeIcon,
} from "react-icons/fa6";

const Icons = {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Bus,
  Camera,
  CarFront,
  Check,
  Clock3,
  ChevronLeft,
  ChevronRight,
  Compass,
  Copy,
  FacebookIcon,
  InstagramIcon,
  Mail,
  MapPin,
  MapPinned,
  MessageCircle,
  Mountain,
  Pause,
  Phone,
  Play,
  TreePine,
  UsersRound,
  WhatsAppIcon,
  YouTubeIcon,
 
} as const;

export type IconsType = typeof Icons;
export type IconName = keyof typeof Icons;

export default Icons;