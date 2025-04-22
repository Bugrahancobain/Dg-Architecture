import Link from 'next/link';
import { adminDb } from '../../../firebaseAdmin';
import './projects.css';

export const dynamic = 'force-dynamic'; // SSR

export default async function Page() {
    const snapshot = await adminDb.ref('references').once('value');
    const tagsSnap = await adminDb.ref('tags').once('value');

    const data = snapshot.val();
    const tagsData = tagsSnap.val();

    const projects = data
        ? Object.entries(data).map(([id, project]) => ({ id, ...project }))
        : [];

    const tags = tagsData ? Object.values(tagsData) : [];

    return (
        <div className='projectsMain'>
            <div className="projectTagsNavbar">
                <form>
                    <input type="hidden" name="selectedTag" value="Tümü" />
                </form>
                <button className='active'>Tümü</button>
                {tags
                    .filter((tag) =>
                        projects.some((p) => p.tags?.includes(tag))
                    )
                    .map((tag, index) => (
                        <button
                            key={index}
                            className={''}
                        >
                            {tag}
                        </button>
                    ))}
            </div>

            <div className={`projectsGrid ${projects.length === 1 ? 'singleProject' : ''}`}>
                {projects.map((project) => (
                    <Link key={project.id} href={`/projects/${project.id}`} className="projectCard">
                        <div className="projectCardImageWrapper">
                            <img
                                src={project.coverImage || project.images?.[0] || '/placeholder.png'}
                                alt={project.location || 'Proje'}
                                className="projectCardImage"
                            />
                            <div className="projectCardOverlay">
                                <h3>{project.location}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
