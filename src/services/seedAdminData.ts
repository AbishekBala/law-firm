import { BlogService, CareerService, TeamService } from '@/services/storageService';
import { blogPosts } from '@/data/blogData';
import { careersData } from '@/data/careersData';
import heroLawyer from '@/assets/hero-lawyer.jpg';
import teamSarah from '@/assets/team-sarah.jpg';
import teamAhmed from '@/assets/team-ahmed.jpg';
import teamFatima from '@/assets/team-fatima.jpg';

const SEED_FLAG = 'abf_admin_seed_v1';

export const ensureSeedData = (): void => {
  try {
    if (localStorage.getItem(SEED_FLAG)) return;

    // Seed blogs
    if (BlogService.list().length === 0) {
      blogPosts.forEach((bp) => {
        BlogService.create({
          title: bp.title.en,
          slug: bp.slug,
          content: bp.content.en,
          category: bp.category.en,
          featuredImage: bp.thumbnail,
        });
      });
    }

    // Seed careers
    if (CareerService.list().length === 0) {
      careersData.forEach((c) => {
        CareerService.create({
          title: c.title,
          location: c.location,
          description: c.description,
          requirements: Array.isArray(c.requirements) ? c.requirements.join('\n') : (c.requirements || ''),
          applicationLink: '',
        });
      });
    }

    // Seed basic team members (images bundled with project)
    if (TeamService.list().length === 0) {
      const seedTeam = [
        { name: 'Ali Bin Fahad', role: 'Managing Partner', photo: heroLawyer },
        { name: 'Sarah Al-Mansouri', role: 'Senior Partner', photo: teamSarah },
        { name: 'Ahmed Al-Mansouri', role: 'Senior Counsel', photo: teamAhmed },
        { name: 'Fatima Al-Zahra', role: 'Associate', photo: teamFatima },
      ];
      seedTeam.forEach((m) => {
        TeamService.create({ name: m.name, role: m.role, photo: m.photo, bio: '' });
      });
    }

    localStorage.setItem(SEED_FLAG, '1');
  } catch (e) {
    // ignore seeding errors in browsers with storage disabled
    // eslint-disable-next-line no-console
    console.warn('Admin seed failed', e);
  }
};

export default ensureSeedData;
