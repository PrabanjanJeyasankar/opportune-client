// import projectService from "@/services/projectService"
// import trackProjectView from "@/utils/incrementProjectViewUtils"
// import { useEffect, useRef } from "react"

// const useIncrementProjectView = (projectIdentifier) => {
//     const isInitialized = useRef(false)

//     useEffect(() => {
//         if(!projectIdentifier || isInitialized.current) return

//         isInitialized.current = true

        
//         const recordViewOnServer = () => {
//             // cleanUp
//             const projectSlug = projectIdentifier.split('/')[1]
//             projectService.incrementProjectViews(projectSlug)
//             .then((response) => {
//                     if(response.status == 200) {
//                         console.log("View incremented successfully")
//                     }
//                 })
//                 .catch((error) => {
//                     if(error) {
//                         console.log("View increment failed❌")
//                     }
//                 })
//         }
            
//         return () => { trackProjectView(
//             projectIdentifier,
//             recordViewOnServer
//         )}
//         console.log(cleanUp)
//         // return () => {
//         //     console.log("cleaned")
//         //     console.log(cleanUp)
//         //     cleanUp
//         // }
//         return cleanUp

//     }, [projectIdentifier])

// }

// export default useIncrementProjectView


import projectService from "@/services/projectService";
import trackProjectView from "@/utils/incrementProjectViewUtils";
import { useEffect, useRef } from "react";

const useIncrementProjectView = (projectIdentifier) => {
    const isInitialized = useRef(false);
    const cleanupRef = useRef(null); // Store cleanup function

    useEffect(() => {
        if (!projectIdentifier || isInitialized.current) return;

        isInitialized.current = true;

        const recordViewOnServer = () => {
            const projectSlug = projectIdentifier.split("/")[1];

            projectService.incrementProjectViews(projectSlug)
                .then((response) => {
                    if (response.status === 200) {
                        console.log("✅ View incremented successfully");
                    }
                })
                .catch((error) => {
                    console.log("❌ View increment failed:", error);
                });
        };

        // Start tracking
        cleanupRef.current = trackProjectView(projectIdentifier, recordViewOnServer);

        return () => {
            if (cleanupRef.current) {
                console.log("Component is unmounting, cleaning up...");
                cleanupRef.current(); // Call cleanup function to clear timeout
            }
        };
    }, [projectIdentifier]);
};

export default useIncrementProjectView;