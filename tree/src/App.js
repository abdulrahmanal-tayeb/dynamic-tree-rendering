import { useState, useEffect, useMemo } from "react";
import { TeamItem } from "./TeamItems";
import "./styles.scss";
import TreeModel from "tree-model";
import "./App.css";
import Message from "./Message";
import { Button } from "@mui/material";


// Sample data.
const config = {
  id: "root",
  name: "root",
  children: [
    {
      id: 4929,
      name: "Home",
      link: "/master",
      children: [
        {
          id: 4930,
          name: "Account Summary",
          link: "/master",
          children: []
        },
        {
          id: 4931,
          name: "Journey Heatmap",
          link: "/master/JourneyCountHeatmap",
          children: []
        },
        {
          id: 4932,
          name: "Calendar",
          link: "/master/StatsCalendar",
          children: []
        },
        {
          id: 4933,
          name: "Covid Sense",
          link: "/master/CovidSense",
          children: []
        }
      ]
    },
    {
      id: 4934,
      name: "Lane Performance",
      link: "/master/Performance/Snapshot",
      children: [
        {
          id: 4935,
          name: "Snapshot",
          link: "/master/Performance/Snapshot",
          children: []
        },
        {
          id: 4936,
          name: "Distribution",
          link: "/master/Performance/Distribution",
          children: []
        },
        {
          id: 4937,
          name: "Location",
          link: "/master/Performance/Locations",
          children: []
        },
        {
          id: 4938,
          name: "Punctuality",
          link: "/master/Performance/Punctuality",
          children: []
        },
        {
          id: 4939,
          name: "Stoppage",
          link: "/master/Performance/Stoppage",
          children: []
        },
        {
          id: 4940,
          name: "Transport Modes",
          link: "/master/Performance/TransportModes",
          children: []
        }
      ]
    },
    {
      id: 4941,
      name: "Lane Visibility",
      link: "/master/Visibility/LaneSight",
      children: [
        {
          id: 4942,
          name: "Lane Sight",
          link: "/master/Visibility/LaneSight",
          children: []
        },
        {
          id: 4943,
          name: "Lane Comparison",
          link: "/master/visibility/LaneComparison",
          children: []
        },
        {
          id: 4944,
          name: "Lane Score",
          link: "/master/visibility/LaneScore",
          children: []
        },
        {
          id: 4945,
          name: "Stoppage Visibility",
          link: "/master/visibility/StoppageVisibility",
          children: []
        },
        {
          id: 4946,
          name: "Speed Vs Stoppage",
          link: "/master/visibility/SpeedStoppage",
          children: []
        }
      ]
    },
    {
      id: 4947,
      name: "Multi-Modal Logistics",
      link: "/master/MultiModalAnalysis/SpeedLandAirOcean",
      children: [
        {
          id: 4948,
          name: "Speed (Land, Air & Ocean)",
          link: "/master/MultiModalAnalysis/SpeedLandAirOcean",
          children: []
        },
        {
          id: 4949,
          name: "Transit & Dwell Time",
          link: "/master/MultiModalAnalysis/TransitDwellTime",
          children: []
        },
        {
          id: 4950,
          name: "Distance & Time",
          link: "/master/MultiModalAnalysis/DistanceTime",
          children: []
        },
        {
          id: 4951,
          name: "Distribution",
          link: "/master/MultiModalAnalysis/Distribution",
          children: []
        }
      ]
    },
    {
      id: 4952,
      name: "Cold Chain",
      link: "/master/ColdChain/Tracking",
      children: [
        {
          id: 4953,
          link: "None",
          name: "Visibility",
          children: [
            {
              id: 4954,
              name: "Temperature Tracking",
              link: "/master/ColdChain/Tracking",
              children: []
            },
            {
              id: 4955,
              name: "MKT Analysis",
              link: "/master/ColdChain/MKTAnalysis",
              children: []
            },
            {
              id: 4956,
              name: "Lane Comparison",
              link: "/master/ColdChain/Comparison",
              children: []
            },
            {
              id: 4957,
              name: "Lane Score",
              link: "/master/ColdChain/Score",
              children: []
            },
            {
              id: 4958,
              name: "Transporter Performance",
              link: "/master/ColdChain/Performance",
              children: []
            }
          ]
        },
        {
          id: 4959,
          link: "None",
          name: "Analysis",
          children: [
            {
              id: 4960,
              name: "Shipments",
              link: "/master/ColdChain/Analytics/Shipments",
              children: []
            },
            {
              id: 4961,
              name: "Transitions",
              link: "/master/ColdChain/Analytics/Transitions",
              children: []
            },
            {
              id: 4962,
              name: "Range",
              link: "/master/ColdChain/Analytics/Range",
              children: []
            },
            {
              id: 4963,
              name: "Transporter Violations",
              link: "/master/ColdChain/Analytics/Violations",
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 4964,
      name: "Transporters",
      link: "/master/Transporters/Summary",
      children: [
        {
          id: 4965,
          name: "Summary",
          link: "/master/Transporters/Summary",
          children: []
        },
        {
          id: 4966,
          name: "Analysis",
          link: "/master/Transporters/Analysis",
          children: []
        },
        {
          id: 4967,
          name: "Comparision",
          link: "/master/Transporters/TransportersComparison",
          children: []
        },
        {
          id: 4968,
          name: "JourneyMap",
          link: "/master/Transporters/TransportersJourneyMap",
          children: []
        }
      ]
    },
    {
      id: 4969,
      name: "Drivers",
      link: "/master/Drivers/Summary",
      children: [
        {
          id: 4970,
          name: "Summary",
          link: "/master/Drivers/Summary",
          children: []
        },
        {
          id: 4971,
          name: "Analysis",
          link: "/master/Drivers/Analysis",
          children: []
        },
        {
          id: 4972,
          name: "Comparision",
          link: "/master/Drivers/DriversComparison",
          children: []
        },
        {
          id: 4973,
          name: "JourneyMap",
          link: "/master/Drivers/DriversJourneyMap",
          children: []
        }
      ]
    },
    {
      id: 4974,
      name: "Partners",
      link: "/master/Partners/Summary",
      children: [
        {
          id: 4975,
          name: "Summary",
          link: "/master/Partners/Summary",
          children: []
        },
        {
          id: 4976,
          name: "Analysis",
          link: "/master/Partners/Analysis",
          children: []
        },
        {
          id: 4977,
          name: "Comparision",
          link: "/master/Partners/PartnersComparison",
          children: []
        },
        {
          id: 4978,
          name: "JourneyMap",
          link: "/master/Partners/PartnersJourneyMap",
          children: []
        }
      ]
    },
    {
      id: 4979,
      name: "Asset Management",
      link: "/master/asset/visibility/AssetSummary",
      children: [
        {
          id: 4980,
          name: "Asset Summary",
          link: "/master/asset/visibility/AssetSummary",
          children: []
        },
        {
          id: 4981,
          name: "Dwell Time Visibility",
          link: "/master/asset/visibility/DwellTimeVisibility",
          children: []
        },
        {
          id: 4982,
          name: "Asset Cycles",
          link: "/master/asset/visibility/AssetCycles",
          children: []
        }
      ]
    },
    {
      id: 4983,
      name: "Security & Compliance",
      link: "/master/Compliance/Journey",
      children: [
        {
          id: 4984,
          name: "Journey Compliance",
          link: "/master/Compliance/Journey",
          children: []
        }
      ]
    }
  ]
};

const Parent = ({ item, onClick, isParent }) => (
  <div
    className="test"
    onClick={onClick}
    style={{ backgroundColor: isParent > 0 ? "gold" : "green", color: "white" }}
  >
    {item.id}. {item.name}
  </div>
);

export default function App() {
  const [path, setPath] = useState([]);
  const [choosenNode, setChoosenNode] = useState(null);
  const [mode, setMode] = useState("fetching");
  const [childData, setChildData] = useState({});
  const tree = new TreeModel();
  const [root, setRoot] = useState(null);

  useEffect(() => {
    document.body.className = "currentapp_hr teams";
    fetch(`http://localhost:8000/api/nodes/`)
      .then(response => response.json())
      .then(data => {
        setMode(null);
        setRoot(
          tree.parse(
            {
              id: "root",
              name: "root",
              children: data
            }
          )
        );
      })
      .catch(e => {
        alert("It seems that your backend doesn't work. So, the sample will be loaded instead.");
        setRoot(tree.parse(config));
        setMode(null);
      });
  }, []);

  const searchItemPath = (id) =>
    root
      .first((node) => node.model.id === id)
      .getPath()
      .filter((node) => "id" in node.model)
      .map((node) => ({
        id: node.model.id,
        link: node.model.link,
        index: node.getIndex()
      }));

  const onItemAdd = (item) => {
    setChoosenNode(item);
    setMode("addchild");
  }

  const onItemClick = (item) => {
    setChoosenNode(item);
    setMode("choosen");
    const path = searchItemPath(item.id);
    setPath(path);

  };

  const handleSubmission = () => {
    const { name, link } = childData;
    if (!name || !link) {
      alert("Please fill in all fields.");
    }

    fetch("http://127.0.0.1:8000/api/nodes/", {
      method: "POST",
      body: JSON.stringify({ ...childData, ...(choosenNode ? { parent_id: choosenNode.id } : { is_parent: true }) }),
      headers: {
        "Content-Type": "application/json"
      }
      // Here would go the authentication headers.
    }).then(response => {
      if (response.status === 400) {
        alert("Please enter valid fields.");
      } else {
        setChoosenNode(null)
        window.location.href = window.location.href;
      }
      return response.json();
    })
      .then(data => console.log(data))
      .catch(e => {
        console.log(e);
      });

  }

  const BackButton = useMemo(() => (<Button onClick={() => {
    setMode(null);
    setChildData(null);
    setChoosenNode(null);
  }} color={"warning"}>Back</Button>), []);

  switch (mode) {
    case "fetching":
      return <Message title={"Fetching Data..."} onClose={() => setMode(null)} />

    case "addchild":
      return <Message title={choosenNode ? `Insert a Child to ${choosenNode.name}` : "Add Node"} message={
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1em" }}>
          {BackButton}
          <input className="form-control" onChange={({ target: input }) => setChildData(prev => ({ ...prev, name: input.value }))} placeholder="Name" />
          <input className="form-control" onChange={({ target: input }) => setChildData(prev => ({ ...prev, link: input.value }))} placeholder="Link" />
          <Button onClick={handleSubmission} color={"primary"}>Submit</Button>
        </div>
      }
      />
    case "choosen":
      return <>
        <Message title={choosenNode.name} message={
          <>
          {BackButton}
          <p>The user should've been taken to the route of the node (${choosenNode.link}). And because this is for demo purposes only, nothing will happen!</p>
          </>
        } onClose={() => setMode(null)} />
      </>
    default:
      return (
        <div className="hr-teams" style={{ alignItems: "center", padding: "1em" }}>
          <div className="mb-5">
            <Button onClick={() => setMode("addchild")}> + Add Parent</Button>
          </div>
          <div>
            <ul>
              <li><strong style={{color: "gold"}}>Gold</strong> are Parents</li>
              <li><strong style={{color: "green"}}>Green</strong> are children (Leafs)</li>
            </ul>
          </div>
          <TeamItem
            items={root.model.children}
            onItemClick={onItemClick}
            selectedPath={path}
            itemNode={Parent}
            onItemAdd={onItemAdd}
            searchItemPath={searchItemPath}
          />
          <p>By Abdulrahman M. Al-Tayeb - <strong>Tree-Model Library</strong></p>
          <p><strong>If the backend didn't work, try <a onClick={() => setRoot(tree.parse(config))}>loading the sample</a>.</strong></p>
        </div>
      );
  }
}
