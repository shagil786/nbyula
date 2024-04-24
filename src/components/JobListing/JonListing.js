import React, { useEffect, useState } from "react";
import Card from "../../common/components/Cards/Card";
import { getUserDetailsInfo } from "../../utils/userDetailsInfo";
import { getJobListing } from "../../utils/api";
import styles from "./JobListing.module.css";

const JonListing = () => {
  const [isAdmin, setIsAdmin] = useState(getUserDetailsInfo().isAdmin);
  const [jobListing, setJobListing] = useState([]);
  const { wrapper } = styles;

  useEffect(() => {
    getJobListing()
      .then((res) => {
        setJobListing(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {isAdmin && <button>Add Jobs</button>}
      <div className={wrapper}>
        {jobListing?.map((each, index) => (
          <Card key={index} {...each} />
        ))}
      </div>
    </div>
  );
};

export default JonListing;
