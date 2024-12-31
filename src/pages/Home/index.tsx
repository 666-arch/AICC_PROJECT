import "./index.less";
import PanelWrapper from "./../../components/PanelWrapper/index";
const HomePage = () => {
  return (
    <div className="home-page-content">
      <div className="home-page-header">
        <div className="home-page-title">AICC算力数据监测系统</div>
      </div>
      <div className="home-page-main">
        <div className="home-page-main-left">
          <div className="main-left-cloud-platform">
            <div className="main-left-title-box">
              <div className="title-box-icon"></div>
              <div>云平台</div>
            </div>
            <div className="main-left-title-line"></div>
          </div>

          <div className="main-left-memory-statistics">
            <div>
              <PanelWrapper width={362} height={27} content="CPU统计数据" />
            </div>
            <div className="memory-statistics-main">
              <div className="memory-statistics-left"></div>
              <div className="memory-statistics-right">

                <div className="statistics-top">
                  <div>提供</div>
                  <div>3555</div>
                </div>

                <div className="statistics-mid">
                    <div>已分配</div>
                    <div>44.85</div>
                    <div className="statistics-mid-line"></div>
                </div>

                <div className="statistics-mid">
                    <div>未分配</div>
                    <div>55.15</div>
                    <div className="statistics-mid-line"></div>
                </div>

              </div>
            </div>
          </div>

          <div></div>
        </div>

        <div className="home-page-main-right">
          <div className="home-page-main-right-top"></div>
          <div className="home-page-main-right-bot"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
