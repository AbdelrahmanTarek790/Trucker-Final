import { Skeleton } from "@mui/material"

const MobileCardSkeleton = () => {
  return (
    <center>
      <div
        style={{
          display: "flex ",
          width: "95%",
          height: "150px",
          backgroundColor: "white",
          alignItems: "center",
          marginBottom: "10px",
          borderRadius: "15px",
        }}
      >
        <Skeleton
          style={{
            borderRadius: "15px",
            marginLeft: "5px",
            marginRight: "5px",
          }}
          variant="rectangular"
          width={240}
          height={140}
        />

        <div
          style={{
            display: "flex",
            width: "100%",
            overflow: "hidden",
            height: "100%",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <br />
          <Skeleton width={"99%"} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <Skeleton width={"48.5%"} />
            <Skeleton width={"48.5%"} />
          </div>
          <Skeleton width={"99%"} />
          <Skeleton width={"99%"} />
        </div>
      </div>
    </center>
  )
}

export default MobileCardSkeleton
