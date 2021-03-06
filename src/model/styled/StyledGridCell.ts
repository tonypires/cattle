import { DefaultGridCell, DefaultGridCellParams } from '../default/DefaultGridCell';
import { Style, BaseStyle } from './Style';
import { renderer, visualize } from '../../ui/Extensibility';
import { Point, PointLike } from '../../geom/Point';


/**
 * Defines the parameters that can/should be passed to a new StyledGridCell instance.
 */
export interface StyledGridCellParams extends DefaultGridCellParams
{
    placeholder?:string;
    style?:Style;
}

@renderer(draw)
export class StyledGridCell extends DefaultGridCell
{
    @visualize()
    public style:Style = BaseStyle;

    @visualize()
    public placeholder:string = '';

    /**
     * Initializes a new instance of StyledGridCell.
     *
     * @param params
     */
    constructor(params:StyledGridCellParams)
    {
        super(params);

        this.placeholder = params.placeholder || '';
        this.style = params.style || BaseStyle;
    }
}

function draw(gfx:CanvasRenderingContext2D, visual:any):void
{
    let style = visual.style as Style;

    gfx.lineWidth = 1;
    let av = gfx.lineWidth % 2 == 0 ? 0 : 0.5;

    gfx.fillStyle = style.fillColor;
    gfx.fillRect(-av, -av, visual.width, visual.height);

    gfx.strokeStyle = style.borderColor;
    gfx.strokeRect(-av, -av, visual.width, visual.height);

    let textPt = new Point(3, visual.height / 2) as PointLike;
    if (style.text.alignment === 'center')
    {
        textPt.x = visual.width / 2;
    }
    if (style.text.alignment === 'right')
    {
        textPt.x = visual.width - 3;
    }

    gfx.font = `${style.text} ${style.text.variant} ${style.text.weight} ${style.text.size}px ${style.text.font}`;
    gfx.textAlign = style.text.alignment;
    gfx.textBaseline = 'middle';
    gfx.fillStyle = style.text.color;
    gfx.fillText(style.formatter(visual.value, visual) || visual.placeholder, textPt.x, textPt.y);
}