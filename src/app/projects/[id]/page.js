import { adminDb } from '../../../../firebaseAdmin';
import { notFound } from 'next/navigation';
import ImagePopup from './ImagePopup';
import './projectDetail.css';

export async function generateStaticParams() {
    const snapshot = await adminDb.ref('references').once('value');
    const data = snapshot.val();

    return data
        ? Object.keys(data).map((id) => ({ id }))
        : [];
}

export default async function ProjectDetail({ params }) {
    const snapshot = await adminDb.ref(`references/${params.id}`).once('value');
    const project = snapshot.val();

    if (!project) return notFound();

    const getYoutubeVideoId = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
        const match = url?.match(regex);
        return match ? match[1] : null;
    };

    return (
        <div className="projectDetailPage">
            <div className="coverSection">
                <img src={project.coverImage || project.images?.[0]} alt="Kapak" className="coverImage" />
            </div>

            <div className="infoSection">
                <div className="description">
                    <p>{project.description}</p>
                </div>

                <div className="details">
                    <h2>Proje Bilgileri</h2>
                    <strong>Proje İsmi:</strong><span> {project.location}</span>
                    <strong>Konum:</strong><span> {project.purpose}</span>
                    <strong>Yıl:</strong><span> {project.year}</span>
                    <strong>İnşaat Alanı:</strong><span> {project.area}</span>
                    <strong>Blok Adedi:</strong><span> {project.blocks}</span>
                    <strong>Yapım Süreci:</strong><span> {project.status}</span>
                </div>
            </div>

            {project.youtube && (
                <div className="videoSection">
                    <iframe
                        width="100%"
                        height="500"
                        src={`https://www.youtube.com/embed/${getYoutubeVideoId(project.youtube)}`}
                        title="Proje Videosu"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}

            {project.images && project.images.filter(Boolean).length > 0 && (
                <div className="gallerySection">
                    {project.images.filter(Boolean).map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`Proje Foto ${idx + 1}`}
                            className="galleryImage"
                        />
                    ))}
                </div>
            )}
            {project.images && project.images.filter(Boolean).length > 0 && (
                <ImagePopup images={project.images.filter(Boolean)} />
            )}
        </div>
    );
}
