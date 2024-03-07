import React, { } from "react";
import {
  View,
  Grid,
  // Flex,
  // Card,
  // Placeholder,
  useTheme,
} from "@aws-amplify/ui-react";
import { MdEvent, MdPeople, MdRemoveRedEye, MdSchool, /* MdWeb */ /* MdPermIdentity */ } from "react-icons/md";

import MiniStatistics from "./MiniStatistics";


import "./Dashboard.css";
import ProfesseurComponent from "../../components/professeurs/ProfesseurComponent";
import { useSelector } from "react-redux";
import UserInfo from "../../components/headerInfo/UserInfo";


const Dashboard = () => {

  const classes = useSelector((state) => state.classeReducer.classes);
  const professeurs = useSelector(state => state.professeurReducer.professeurs);
  const trimestre = useSelector((state) => state.trimestreReducer.trimestres);



  const { tokens } = useTheme();


  return (
    <>
      <div>
        <h2>Tableau de bord</h2>


        <UserInfo/>

      </div>
      <View borderRadius="6px" maxWidth="100%" padding="0rem" minHeight="100%">
        <ProfesseurComponent/>
        <Grid
          templateColumns={{ base: "1fr", large: "1fr 1fr 1fr" }}
          templateRows={{ base: "repeat(4, 10rem)", large: "repeat(3, 8rem)" }}
          gap={tokens.space.xl}
        >
          <View rowSpan={{ base: 1, large: 1 }}>
            <MiniStatistics
              title="Nombre de classe"
              classe={classes ? classes?.length : 0}
              amount="321,236"
              eleve=""
              icon={ <MdSchool />}
            />
          </View>
          <View rowSpan={{ base: 1, large: 1 }}>
            <MiniStatistics
              title="Nombre de professeur"
              eleve="Sidibe"
              classe={professeurs ? professeurs?.length : 0}
              amount=""
              icon={<MdPeople  />}
            />
          </View>
          <View rowSpan={{ base: 1, large: 1 }}>
            <MiniStatistics
              title="Nombre de trimestre"
              eleve="Sidibe"
              classe={trimestre ? trimestre?.length : 0}
              amount=""
              icon={<MdEvent  />}
            />
          </View>
          {/* <View rowSpan={{ base: 1, large: 1 }}>
            <MiniStatistics title="Visits" amount="251,607" icon={<MdWeb />} />
          </View>
          <View rowSpan={{ base: 1, large: 1 }}>
            <MiniStatistics
              title="Unique Visitors"
              amount="23,762"
              icon={<MdPermIdentity />}
            />
          </View> */}

          {/* <View columnSpan={[1, 1, 1, 2]} rowSpan={{ base: 3, large: 4 }}>
            <Card borderRadius="15px">
              <div className="card-title">Traffic Summary</div>
              <div className="chart-wrap">
                {barChartData ? (
                  <div className="row">
                    <TrafficSummary
                      title="Traffic Summary"
                      data={barChartData}
                      type="bar"
                      labels={[
                        "2022-01-20",
                        "2022-01-21",
                        "2022-01-22",
                        "2022-01-23",
                        "2022-01-24",
                        "2022-01-25",
                        "2022-01-26",
                        "2022-01-27",
                        "2022-01-28",
                        "2022-01-29",
                        "2022-01-30",
                        "2022-02-01",
                        "2022-02-02",
                        "2022-02-03",
                        "2022-02-04",
                        "2022-02-05",
                        "2022-02-06",
                        "2022-02-07",
                        "2022-02-08",
                        "2022-02-09",
                        "2022-02-10",
                        "2022-02-11",
                        "2022-02-12",
                        "2022-02-13",
                        "2022-02-14",
                        "2022-02-15",
                        "2022-02-16",
                        "2022-02-17",
                        "2022-02-18",
                        "2022-02-19",
                        "2022-02-20",
                        "2022-02-21",
                        "2022-02-22",
                        "2022-02-23",
                        "2022-02-24",
                        "2022-02-25",
                        "2022-02-26",
                      ]}
                    />
                  </div>
                ) : (
                  <Flex direction="column" minHeight="285px">
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                  </Flex>
                )}
              </div>
            </Card>
          </View> */}
          {/* <View rowSpan={{ base: 1, large: 4 }}>
            <Card height="100%" borderRadius="15px">
              <div className="card-title">Traffic Sources</div>
              <div className="chart-wrap">
                {barChartData ? (
                  <TrafficSources
                    title="Traffic Sources"
                    data={trafficSourceData}
                    type="donut"
                    labels={[
                      "Direct",
                      "Internal",
                      "Referrals",
                      "Search Engines",
                      "Other",
                    ]}
                  />
                ) : (
                  <Flex direction="column" minHeight="285px">
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                  </Flex>
                )}
              </div>
            </Card>
          </View>

          <View columnSpan={[1, 1, 1, 2]} rowSpan={{ base: 3, large: 4 }}>
            <Card borderRadius="15px">
              <div className="card-title">Sales Summary</div>
              <div className="chart-wrap">
                {barChartData ? (
                  <div className="row">
                    <SalesSummary
                      title="Sales Summary"
                      data={lineChartData}
                      type="line"
                      labels={[
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ]}
                    />
                  </div>
                ) : (
                  <Flex direction="column" minHeight="285px">
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                  </Flex>
                )}
              </div>
            </Card>
          </View>

          <View rowSpan={{ base: 1, large: 4 }}>
            <Card height="100%" borderRadius="15px">
              <div className="card-title">New Customers</div>
              <div className="chart-wrap">
                {barChartData ? (
                  <div className="row">
                    <CustomersSummary
                      title="CutomersSummary"
                      data={customersData}
                      type="line"
                      labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
                    />
                  </div>
                ) : (
                  <Flex direction="column" minHeight="285px">
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                  </Flex>
                )}
              </div>
            </Card>
          </View> */}
        </Grid>
      </View>
    </>
  );
};

export default Dashboard;
