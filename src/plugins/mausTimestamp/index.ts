import { definePlugin } from "../../api/plugins";
import { patcher, webpack } from "../../api";

export default definePlugin({
    name: "MausTimestamp",
    description: "Mostra la data nel formato DD MM YY | HH : MM : SS",
    authors: [{ name: "onlyMAUS", id: 1106518428453474324n }], // Ho inserito un ID d'esempio, puoi mettere il tuo
    tags: ["timestamp", "custom"],

    start() {
        const MessageTimestamp = webpack.findByProps("MessageTimestamp");

        if (MessageTimestamp) {
            patcher.after(MessageTimestamp, "default", (_, res) => {
                if (res?.props?.timestamp) {
                    // Il formato richiesto: %d %m %y | %H : %M : %S
                    res.props.timestamp = res.props.timestamp.format("DD - MM - YY | HH : mm : ss");
                }
            });
        }
    },

    stop() {
        patcher.unpatchAll();
    }
});
