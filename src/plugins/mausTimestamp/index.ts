import { definePlugin } from "@api/plugins";
import { patcher, webpack } from "@api";

export default definePlugin({
    name: "MausTimestamp",
    description: "Mostra la data nel formato DD MM YY | HH : MM : SS",
    authors: [{ name: "onlyMAUS", id: 123456789n }], // Puoi mettere il tuo ID Discord qui
    tags: ["timestamp", "custom"],

    start() {
        // Cerchiamo il modulo che gestisce la formattazione del tempo in Discord
        const MessageTimestamp = webpack.findByProps("MessageTimestamp");

        if (MessageTimestamp) {
            patcher.after(MessageTimestamp, "default", (_, res) => {
                // Modifichiamo il timestamp visualizzato con il tuo formato
                if (res?.props?.timestamp) {
                    res.props.timestamp = res.props.timestamp.format("DD MM YY | HH : mm : ss");
                }
            });
        }
    },

    stop() {
        patcher.unpatchAll();
    }
});
