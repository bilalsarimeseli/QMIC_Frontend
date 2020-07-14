import React, { useMemo } from "react";
import objectPath from "object-path";
import { useHtmlClassService } from "../../layout";
import { DashBoardComponent } from "./DashBoardComponent";

export function Dashboard() {
    const uiService = useHtmlClassService();
    const layoutProps = useMemo(() => {
        return {
            demo: objectPath.get(
                uiService.config,
                "qmic"
            )};
    }, [uiService]);
    return <>
        {layoutProps.demo === 'qmic' && <DashBoardComponent/>}
    </>;
}
