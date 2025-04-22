// components/OurProjects.js (SSR versiyon)
import Link from 'next/link';
import { adminDb } from '../../../firebaseAdmin';
import '../style/ourProjects.css';

export const dynamic = 'force-dynamic';

export default async function OurProjects() {
    const snapshot = await adminDb.ref('references').once('value');
    const data = snapshot.val();

    const projects = data
        ? Object.entries(data)
            .map(([id, project]) => ({ id, ...project }))
            .filter((proj) => proj.status === 'Hazır')
            .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
            .slice(0, 6)
        : [];

    return (
        <div className="ourProjectsMain">
            <h2>Projelerimiz</h2>
            <div className={`ourProjectsGrid ${projects.length === 1 ? 'singleProject' : ''}`}>
                {projects.map((project) => (
                    <Link key={project.id} href={`/projects/${project.id}`} className="ourProjectCard">
                        <div className="ourProjectCardImageWrapper">
                            <img
                                src={project.coverImage || project.images?.[0] || '/placeholder.png'}
                                alt={project.location || 'Proje'}
                                className="ourProjectCardImage"
                            />
                            <div className="ourProjectCardOverlay">
                                <h3>{project.location}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="ourProjectsButtonWrapper">
                <Link href="/projects" className="ourProjectsButton">
                    Tümünü Gör
                </Link>
            </div>
        </div>
    );
}
