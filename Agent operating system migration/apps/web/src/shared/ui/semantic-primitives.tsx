import clsx from "clsx";

import type {
  ParticipationKind,
  PublicationStatus,
  ReviewState,
  VisibilityScope,
} from "~/shared/contracts";

type BadgeTone = "neutral" | "good" | "attention" | "muted";

const visibilityLabels: Record<VisibilityScope, string> = {
  private: "Private",
  steward_visible: "Steward visible",
  community_visible: "Community visible",
  link_visible: "Link visible",
  public: "Public",
};

const publicationLabels: Record<PublicationStatus, string> = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
};

const reviewLabels: Record<ReviewState, string> = {
  not_required: "No review",
  pending_review: "Pending review",
  accepted: "Accepted",
  rejected: "Rejected",
  superseded: "Superseded",
};

export function VisibilityBadge({ scope }: { scope: VisibilityScope }) {
  return <Badge tone={scope === "public" ? "good" : "attention"}>{visibilityLabels[scope]}</Badge>;
}

export function PublicationStatusBadge({ status }: { status: PublicationStatus }) {
  const tone: BadgeTone =
    status === "published" ? "good" : status === "archived" ? "muted" : "attention";
  return <Badge tone={tone}>{publicationLabels[status]}</Badge>;
}

export function ReviewStateBadge({ state }: { state: ReviewState }) {
  const tone: BadgeTone =
    state === "accepted" || state === "not_required"
      ? "good"
      : state === "pending_review"
        ? "attention"
        : "muted";
  return <Badge tone={tone}>{reviewLabels[state]}</Badge>;
}

export function EntityCard(props: {
  title: string;
  eyebrow: string;
  summary: string;
  children?: React.ReactNode;
}) {
  return (
    <article className="fp-card">
      <p className="fp-card__eyebrow">{props.eyebrow}</p>
      <h2 className="fp-card__title">{props.title}</h2>
      <p className="fp-card__summary">{props.summary}</p>
      {props.children ? <div className="fp-card__footer">{props.children}</div> : null}
    </article>
  );
}

export function FieldSignalCard(props: { title: string; signalType: string; body: string }) {
  return (
    <EntityCard
      eyebrow={`Field signal: ${props.signalType}`}
      title={props.title}
      summary={props.body}
    />
  );
}

export function WaysInBlock({
  items,
}: {
  items: readonly {
    audience: string;
    threshold: string;
    access: string;
    priceText?: string;
    experienceLevel: string;
    entrySuggestion: string;
  }[];
}) {
  return (
    <section className="fp-section">
      <h2 className="fp-section__title">Ways in</h2>
      <div className="fp-stack">
        {items.map((item) => (
          <article className="fp-way-in" key={`${item.audience}-${item.entrySuggestion}`}>
            <h3>{item.audience}</h3>
            <p>{item.entrySuggestion}</p>
            <dl>
              <div>
                <dt>Threshold</dt>
                <dd>{item.threshold}</dd>
              </div>
              <div>
                <dt>Access</dt>
                <dd>{item.access}</dd>
              </div>
              <div>
                <dt>Experience</dt>
                <dd>{item.experienceLevel}</dd>
              </div>
              {item.priceText ? (
                <div>
                  <dt>Price</dt>
                  <dd>{item.priceText}</dd>
                </div>
              ) : null}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

export function StewardAttributionBlock(props: { stewardName: string; contribution: string }) {
  return (
    <aside className="fp-attribution">
      <span>Stewarded by</span>
      <strong>{props.stewardName}</strong>
      <p>{props.contribution}</p>
    </aside>
  );
}

export function RelationClaimPrompt(props: {
  relationType: string;
  rationale: string;
  state: ReviewState;
}) {
  return (
    <EntityCard eyebrow="Relation claim" title={props.relationType} summary={props.rationale}>
      <ReviewStateBadge state={props.state} />
    </EntityCard>
  );
}

export function SaveFollowTrackControl({
  selected,
  kind,
}: {
  selected: boolean;
  kind: ParticipationKind;
}) {
  return (
    <button className={clsx("fp-toggle", selected && "fp-toggle--selected")} type="button">
      {selected ? "Tracking" : participationLabel(kind)}
    </button>
  );
}

export function ProfileDataVisibilityPanel(props: {
  showEmail: boolean;
  showParticipation: boolean;
  showStewardships: boolean;
}) {
  return (
    <section className="fp-panel">
      <h2>Profile data visibility</h2>
      <ul>
        <VisibilityRow label="Email" visible={props.showEmail} />
        <VisibilityRow label="Participation" visible={props.showParticipation} />
        <VisibilityRow label="Stewardships" visible={props.showStewardships} />
      </ul>
    </section>
  );
}

export function CommunityRhythmSection(props: { rhythmSummary: string }) {
  return (
    <section className="fp-section">
      <h2 className="fp-section__title">Community rhythm</h2>
      <p>{props.rhythmSummary}</p>
    </section>
  );
}

export function WhoThisIsForBlock({ audiences }: { audiences: readonly string[] }) {
  return (
    <section className="fp-section">
      <h2 className="fp-section__title">Who this is for</h2>
      <ul className="fp-list">
        {audiences.map((audience) => (
          <li key={audience}>{audience}</li>
        ))}
      </ul>
    </section>
  );
}

function Badge({ children, tone }: { children: React.ReactNode; tone: BadgeTone }) {
  return <span className={clsx("fp-badge", `fp-badge--${tone}`)}>{children}</span>;
}

function VisibilityRow({ label, visible }: { label: string; visible: boolean }) {
  return (
    <li>
      <span>{label}</span>
      <Badge tone={visible ? "good" : "muted"}>{visible ? "Visible" : "Private"}</Badge>
    </li>
  );
}

function participationLabel(kind: ParticipationKind) {
  if (kind === "saved") {
    return "Save";
  }

  if (kind === "followed") {
    return "Follow";
  }

  return "Track";
}
