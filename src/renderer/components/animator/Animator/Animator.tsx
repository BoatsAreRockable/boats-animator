import { Link } from "react-router-dom";
import Content from "../../common/Content/Content";
import ContentBlock from "../../common/ContentBlock/ContentBlock";
import IconName from "../../common/Icon/IconName";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";
import PageFooter from "../../common/PageFooter/PageFooter";
import PageFooterItem from "../../common/PageFooterItem/PageFooterItem";
import Sidebar from "../../common/Sidebar/Sidebar";
import SidebarBlock from "../../common/SidebarBlock/SidebarBlock";
import Tab from "../../common/Tab/Tab";
import TabGroup from "../../common/TabGroup/TabGroup";
import ExportDirectory from "../ExportDirectory/ExportDirectory";

const Animator = (): JSX.Element => {
  return (
    <Page>
      <PageBody>
        <Content>
          <ContentBlock>
            <h1>Hello Boats Animator World!</h1>

            <p>Your current platform is {window.preload.platform}.</p>

            <Link to="/">Go to launcher</Link>
          </ContentBlock>
        </Content>

        <Sidebar>
          <TabGroup
            titles={["Capture", "Guides", "Export"]}
            tabs={[
              <Tab>
                <SidebarBlock title="Capture" titleIcon={IconName.CAPTURE}>
                  Capture
                </SidebarBlock>

                <SidebarBlock
                  title="Auto-Capture"
                  titleIcon={IconName.CAPTURE_AUTO}
                >
                  Auto-Capture
                </SidebarBlock>
              </Tab>,

              <Tab>
                <SidebarBlock title="Guides" titleIcon={IconName.GUIDES}>
                  Guides
                </SidebarBlock>
              </Tab>,

              <Tab>
                <SidebarBlock title="Export" titleIcon={IconName.EXPORT}>
                  <ExportDirectory />
                </SidebarBlock>
              </Tab>,
            ]}
          />
        </Sidebar>
      </PageBody>

      <PageFooter>
        <PageFooterItem value={"Frame 1 of 0"}></PageFooterItem>
        <PageFooterItem value={"15 FPS"}></PageFooterItem>
        <PageFooterItem value={"No camera selected"}></PageFooterItem>
        <PageFooterItem value={"Capture mode"}></PageFooterItem>
      </PageFooter>
    </Page>
  );
};

export default Animator;