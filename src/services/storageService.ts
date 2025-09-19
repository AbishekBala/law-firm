export type BlogPost = {
  id: string;
  title: string;
  slug?: string;
  content: string;
  category?: string;
  featuredImage?: string;
  createdAt: string;
};

export type CareerItem = {
  id: string;
  title: string;
  location?: string;
  description: string;
  requirements?: string;
  applicationLink?: string;
  createdAt: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role?: string;
  photo?: string;
  bio?: string;
  social?: Record<string, string>;
  createdAt: string;
};

const KEY_BLOG = 'abf_admin_blogs_v1';
const KEY_CAREER = 'abf_admin_careers_v1';
const KEY_TEAM = 'abf_admin_team_v1';

const read = <T,>(key: string): T[] => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch (e) {
    return [];
  }
};

const write = <T,>(key: string, items: T[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(items));
    return true;
  } catch (e) {
    return false;
  }
};

const uid = () => Math.random().toString(36).slice(2, 9);

export const BlogService = {
  list: (): BlogPost[] => read<BlogPost>(KEY_BLOG),
  get: (id: string) => read<BlogPost>(KEY_BLOG).find((b) => b.id === id),
  create: (data: Partial<BlogPost>) => {
    const items = read<BlogPost>(KEY_BLOG);
    const now = new Date().toISOString();
    const item: BlogPost = {
      id: uid(),
      title: data.title || 'Untitled',
      slug: data.slug || undefined,
      content: data.content || '',
      category: data.category || 'general',
      featuredImage: data.featuredImage || undefined,
      createdAt: now,
    };
    items.unshift(item);
    write(KEY_BLOG, items);
    return item;
  },
  update: (id: string, data: Partial<BlogPost>) => {
    const items = read<BlogPost>(KEY_BLOG);
    const idx = items.findIndex((b) => b.id === id);
    if (idx === -1) return null;
    items[idx] = { ...items[idx], ...data };
    write(KEY_BLOG, items);
    return items[idx];
  },
  remove: (id: string) => {
    let items = read<BlogPost>(KEY_BLOG);
    items = items.filter((b) => b.id !== id);
    write(KEY_BLOG, items);
    return true;
  },
};

export const CareerService = {
  list: (): CareerItem[] => read<CareerItem>(KEY_CAREER),
  get: (id: string) => read<CareerItem>(KEY_CAREER).find((b) => b.id === id),
  create: (data: Partial<CareerItem>) => {
    const items = read<CareerItem>(KEY_CAREER);
    const now = new Date().toISOString();
    const item: CareerItem = {
      id: uid(),
      title: data.title || 'Untitled Position',
      location: data.location || '',
      description: data.description || '',
      requirements: data.requirements || '',
      applicationLink: data.applicationLink || '',
      createdAt: now,
    };
    items.unshift(item);
    write(KEY_CAREER, items);
    return item;
  },
  update: (id: string, data: Partial<CareerItem>) => {
    const items = read<CareerItem>(KEY_CAREER);
    const idx = items.findIndex((b) => b.id === id);
    if (idx === -1) return null;
    items[idx] = { ...items[idx], ...data };
    write(KEY_CAREER, items);
    return items[idx];
  },
  remove: (id: string) => {
    let items = read<CareerItem>(KEY_CAREER);
    items = items.filter((b) => b.id !== id);
    write(KEY_CAREER, items);
    return true;
  },
};

export const TeamService = {
  list: (): TeamMember[] => read<TeamMember>(KEY_TEAM),
  get: (id: string) => read<TeamMember>(KEY_TEAM).find((b) => b.id === id),
  create: (data: Partial<TeamMember>) => {
    const items = read<TeamMember>(KEY_TEAM);
    const now = new Date().toISOString();
    const item: TeamMember = {
      id: uid(),
      name: data.name || 'Unnamed',
      role: data.role || '',
      photo: data.photo || '',
      bio: data.bio || '',
      social: data.social || {},
      createdAt: now,
    };
    items.unshift(item);
    write(KEY_TEAM, items);
    return item;
  },
  update: (id: string, data: Partial<TeamMember>) => {
    const items = read<TeamMember>(KEY_TEAM);
    const idx = items.findIndex((b) => b.id === id);
    if (idx === -1) return null;
    items[idx] = { ...items[idx], ...data };
    write(KEY_TEAM, items);
    return items[idx];
  },
  remove: (id: string) => {
    let items = read<TeamMember>(KEY_TEAM);
    items = items.filter((b) => b.id !== id);
    write(KEY_TEAM, items);
    return true;
  },
};

export default null as unknown as void;
