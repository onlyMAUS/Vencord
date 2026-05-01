import { definePlugin } from "../../api/plugins";
import { patcher, webpack } from "../../api";

export default definePlugin({
    name: "MausTimestamp",
    description: "Mostra la data nel formato DD - MM - YY | HH : mm : ss",
    authors: [{ name: "onlyMAUS", id: 1106518428453474324n }],
    tags: ["timestamp", "custom"],

    start() {
        // Usiamo un finder più robusto per trovare il componente del Timestamp
        const MessageTimestamp = webpack.findByDisplayName("MessageTimestamp", false);

        if (MessageTimestamp) {
            patcher.after(MessageTimestamp, "default", (args, res) => {
                // Verifichiamo che il timestamp esista nel componente
                if (res?.props?.timestamp) {
                    // Formato richiesto: DD - MM - YY | HH : mm : ss
                    res.props.timestamp = res.props.timestamp.format("DD - MM - YY | HH : mm : ss");
                }
                return res;
            });
        }
    },

    stop() {
        patcher.unpatchAll();
    }
});
