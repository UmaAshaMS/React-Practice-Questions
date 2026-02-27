import { useEffect, useState } from "react";

export default function HackerNewsJobBoard() {
  const [jobIds, setJobIds] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://hacker-news.firebaseio.com/v0/jobstories.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setJobIds(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    async function fetchJobs() {
      const selectedIds = jobIds.slice(0, visibleCount);

      const jobRequests = selectedIds.map((id) =>
        fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        ).then((res) => res.json())
      );

      const jobData = await Promise.all(jobRequests);
      setJobs(jobData);
    }

    if (jobIds.length) fetchJobs();
  }, [jobIds, visibleCount]);

  if (loading) return <h3>Loading jobs...</h3>;

  return (
    <div style={styles.container}>
      <h2>Hacker News Job Board</h2>

      {jobs.map((job) => (
        <div key={job.id} style={styles.card}>
          <h3>{job.title}</h3>

          <p>
            By: {job.by} |{" "}
            {new Date(
              job.time * 1000
            ).toLocaleDateString()}
          </p>

          <a
            href={job.url}
            target="_blank"
            rel="noreferrer"
          >
            View Job
          </a>
        </div>
      ))}

      {visibleCount < jobIds.length && (
        <button
          onClick={() =>
            setVisibleCount((prev) => prev + 6)
          }
          style={styles.button}
        >
          Load More
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "700px",
    margin: "40px auto",
    fontFamily: "Arial"
  },
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "6px"
  },
  button: {
    padding: "10px 20px",
    cursor: "pointer"
  }
};