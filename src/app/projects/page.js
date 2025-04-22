// /src/app/projects/page.js
import Link from 'next/link';
import { adminDb } from '../../../firebaseAdmin';
import { notFound } from 'next/navigation';
import './projects.css';

export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }) {
    const selectedTag = searchParams?.tag || "Tümü";

    const snapshot = await adminDb.ref('references').once('value');
    const tagsSnap = await adminDb.ref('tags').once('value');

    const data = snapshot.val();
    const tagsData = tagsSnap.val();

    const projects = data
        ? Object.entries(data).map(([id, project]) => ({ id, ...project }))
        : [];

    const tags = tagsData ? Object.values(tagsData) : [];

    const filteredProjects =
        selectedTag === "Tümü"
            ? projects
            : projects.filter((p) => p.tags?.includes(selectedTag));

    return (
        <div className='projectsMain'>
            <div className="projectTagsNavbar">
                <Link href="/projects" scroll={false}>
                    <button className={selectedTag === "Tümü" ? 'active' : ''}>Tümü</button>
                </Link>
                {tags
                    .filter((tag) =>
                        projects.some((p) => p.tags?.includes(tag))
                    )
                    .map((tag, index) => (
                        <Link key={index} href={`/projects?tag=${encodeURIComponent(tag)}`} scroll={false}>
                            <button className={selectedTag === tag ? 'active' : ''}>{tag}</button>
                        </Link>
                    ))}
            </div>

            <div className={`projectsGrid ${filteredProjects.length === 1 ? 'singleProject' : ''}`}>
                {filteredProjects.map((project) => (
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