
export interface ZoneTitleArgs {
    title: string;
    subtitle: string;
    accent: string;
    titleColor: string;
}
export function setZoneTitle(params: ZoneTitleArgs): void {
    const el = document.getElementById('zone-title');
    const titleEl = el?.querySelector('.zt-title');
    const subtitleEl = el?.querySelector('.zt-sub');

    if (!el || !titleEl || !subtitleEl) return;

    const { title, subtitle, accent, titleColor } = params;

    titleEl.textContent = title;
    subtitleEl.textContent = subtitle;

    el.style.setProperty('--accent', accent);
    el.style.setProperty('--title-color',titleColor);

    el.classList.remove('show');
    void el.offsetWidth;
    el.classList.add('show');


}