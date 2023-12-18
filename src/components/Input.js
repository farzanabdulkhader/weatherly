import SearchIcon from "@mui/icons-material/Search";

export default function Input({ location, setLocation }) {
  const iconStyle = {
    position: "absolute",
    left: "1rem",
    top: "50%",
    transform: "translate(0, -50%)",
    fontSize: "1.7rem",
  };
  return (
    <>
      <div style={{ position: "relative" }}>
        {!location && <SearchIcon style={iconStyle} />}

        <input
          type="text"
          placeholder="   Search from location..."
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
      </div>
    </>
  );
}
