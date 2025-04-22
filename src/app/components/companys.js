// app/components/Companys.js (SSR uyumlu)
import { adminDb } from '../../../firebaseAdmin';
import '../style/companys.css';

export const dynamic = 'force-dynamic';

export default async function Companys() {
    const snapshot = await adminDb.ref('companies').once('value');
    const data = snapshot.val();
    const companies = data ? Object.entries(data).map(([id, val]) => ({ id, ...val })) : [];

    return (
        <div className="companyCardsMain">
            <h2>Çözüm Ortaklarımız</h2>
            <div className="companyCardsGrid">
                {companies.map((company) => (
                    company.logo && (
                        <div className="companyCardBox" key={company.id}>
                            {company.website !== 'https://' ? (
                                <a
                                    href={company.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="clickableArea"
                                >
                                    <img src={company.logo} alt={company.name} className="companyCardLogo" />
                                    <div className="companyCardOverlay">{company.name}</div>
                                </a>
                            ) : (
                                <>
                                    <img src={company.logo} alt={company.name} className="companyCardLogo" />
                                    <div className="companyCardOverlay">{company.name}</div>
                                </>
                            )}
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}
