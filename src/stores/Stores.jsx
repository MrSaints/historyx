import HistoryStore from "./HistoryStore.jsx";
import SearchStore from "./SearchStore.jsx";

export default {
    history: new HistoryStore(),
    search: new SearchStore()
};