export function isPageViewer() {
    return localStorage.getItem("viewer_paging") === "1";
}