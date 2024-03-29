export default function Root(props) {
  return (
    <section>{props.name} is mounted!{window.location.origin}</section>
  );
}
