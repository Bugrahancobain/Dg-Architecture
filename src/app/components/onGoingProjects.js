// components/OnGoingProjects.js (SSR versiyon)
import Link from 'next/link';
import { adminDb } from '../../../firebaseAdmin';
import '../style/onGoingProjects.css';

export const dynamic = 'force-dynamic';

export default async function OnGoingProjects() {
    const snapshot = await adminDb.ref('references').once('value');
    const data = snapshot.val();

    const projects = data
        ? Object.entries(data)
            .map(([id, project]) => ({ id, ...project }))
            .filter((proj) => proj.status === 'Devam Ediyor')
            .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
            .slice(0, 3)
        : [];

    return (
        <div className='onGoingProjectsMain'>
            <h2>Devam Eden Projelerimiz</h2>
            <div className={`onGoingProjectsGrid ${projects.length === 1 ? 'singleProject' : ''}`}>
                {projects.map((project) => (
                    <Link key={project.id} href={`/projects/${project.id}`} className='onGoingCard'>
                        <div className='onGoingCardImageWrapper'>
                            <img
                                src={project.coverImage || project.images?.[0] || '/placeholder.png'}
                                alt={project.location || 'Proje'}
                                className='onGoingCardImage'
                            />
                            <div className='onGoingCardOverlay'>
                                <h3>{project.location}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className='allButtonWrapper'>
                <Link className='allButton' href="/projects">Tümünü Gör</Link>
            </div>
        </div>
    );
}
