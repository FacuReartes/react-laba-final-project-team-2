function useCustomQuery() {
  return new URLSearchParams(window.location.search);
}

export default useCustomQuery;
