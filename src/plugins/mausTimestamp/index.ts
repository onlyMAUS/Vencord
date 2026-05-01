start() {
        // Usiamo un finder più robusto per trovare il componente del Timestamp
        const MessageTimestamp = webpack.findByDisplayName("MessageTimestamp", false);

        if (MessageTimestamp) {
            patcher.after(MessageTimestamp, "default", (args, res) => {
                // Verifichiamo che il timestamp esista nel componente
                if (res?.props?.timestamp) {
                    // Sovrascriviamo la funzione di rendering o il testo direttamente
                    // Il formato richiesto: DD - MM - YY | HH : mm : ss
                    res.props.timestamp = res.props.timestamp.format("DD - MM - YY | HH : mm : ss");
                }
                return res;
            });
        }
    },
