import { PRIMARY_BRAND_COLOR } from "lib/constants/styles"
import { MoreVertical } from "react-feather"

const MapFeatureListOptions = () => {
    return (
        <button>
            <MoreVertical color={PRIMARY_BRAND_COLOR} size={20} />
        </button>
    )
}

export default MapFeatureListOptions;