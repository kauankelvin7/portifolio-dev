import { getTranslations } from "next-intl/server";

export async function JourneySection() {
  const t = await getTranslations("ProcessSection");
  const items = [t("item1"), t("item2"), t("item3"), t("item4")];

  return (
    <section id="journey" className="editorial-section">
      <div className="container-shell">
        <div className="section-intro">
          <span className="section-index">04</span>
          <span className="section-kicker">{t("eyebrow")}</span>
        </div>

        <div className="journey-v3">
          <div className="journey-v3__heading reveal-stagger">
            <h2 className="editorial-heading">{t("title1")} <span>{t("title2")}</span></h2>
            <p>{t("description")}</p>
          </div>

          <ol className="journey-v3__list reveal-stagger">
            {items.map((item, index) => {
              const [lead, ...rest] = item.split(" — ");
              return (
                <li key={item}>
                  <span className="journey-v3__number">0{index + 1}</span>
                  <div>
                    <strong>{lead}</strong>
                    <p>{rest.join(" — ") || item}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
