import PROJECT_VIEW_CONFIG from "../config/projectViewConfig"

const getViewedProjects = () => {
    try {
        return JSON.parse(localStorage.getItem(PROJECT_VIEW_CONFIG.STORAGE_KEY) || '{}')
    } catch (error) {
        console.log("❌ Error reading local storage:", error)
        return {} 
    }
}

const recordLocalView = (projectIdentifier) => {
    try {
        const viewedProjects = getViewedProjects()
        viewedProjects[projectIdentifier] = Date.now()
        localStorage.setItem(PROJECT_VIEW_CONFIG.STORAGE_KEY, JSON.stringify(viewedProjects))
    } catch (error) {
        console.log("❌ Error recording local view:", error)
    }
}

const wasRecentlyViewed = (projectIdentifier) => {
    const viewedProject = getViewedProjects()
    if (!viewedProject || Object.keys(viewedProject).length === 0) return false

    const lastViewTime = viewedProject[projectIdentifier] 
    const now = Date.now()
    
    return lastViewTime && (now - lastViewTime) <= PROJECT_VIEW_CONFIG.VIEW_COOLDOWN
}

// const trackProjectView = (projectIdentifier, apiCallback) => {
//     if (!projectIdentifier) return () => {}

//     if (wasRecentlyViewed(projectIdentifier)) {
//         return () => {}
//     }

//     let timeOnPageTimer = null
//     let hasRecordedView = false

//     const recordView = () => {
//         if (hasRecordedView) return

//         hasRecordedView = true
//         recordLocalView(projectIdentifier)

//         if (typeof apiCallback === "function") {
//             apiCallback(projectIdentifier)
//         }


//         if (timeOnPageTimer) clearTimeout(timeOnPageTimer)
//     }

//     timeOnPageTimer = setTimeout(() => {
//         console.log("Time limit")
//                 recordView()
//             }, PROJECT_VIEW_CONFIG.ENGAGEMENT_THRESHOLD)

//     return () => {
//         console.log("first")
//         if (timeOnPageTimer) clearTimeout(timeOnPageTimer)
//     }
//     // return () => {
//     //     console.log("first")
//     //     if (timeOnPageTimer) clearTimeout(timeOnPageTimer)
//     // }
// }

// export default trackProjectView


const trackProjectView = (projectIdentifier, apiCallback) => {
    if (!projectIdentifier) return () => {};

    if (wasRecentlyViewed(projectIdentifier)) {
        return () => {};
    }

    let timeOnPageTimer = setTimeout(() => {
        console.log("Time limit reached, recording view...");
        recordView();
    }, PROJECT_VIEW_CONFIG.ENGAGEMENT_THRESHOLD);

    let hasRecordedView = false;

    const recordView = () => {
        if (hasRecordedView) return;

        hasRecordedView = true;
        recordLocalView(projectIdentifier);

        if (typeof apiCallback === "function") {
            apiCallback(projectIdentifier);
        }

        clearTimeout(timeOnPageTimer);
    };

    return () => {
        console.log("Clearing timeout due to unmount");
        clearTimeout(timeOnPageTimer);
    };
};

export default trackProjectView;