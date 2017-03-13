import {Point} from "./geom/Point";
import {Rect} from "./geom/Rect";
import {DefaultGridCell} from "./model/default/DefaultGridCell";
import {DefaultGridColumn} from "./model/default/DefaultGridColumn";
import {DefaultGridModel} from "./model/default/DefaultGridModel";
import {DefaultGridRow} from "./model/default/DefaultGridRow";
import {Style} from "./model/styled/Style";
import {StyledGridCell} from "./model/styled/StyledGridCell";
import {GridRange} from "./model/GridRange";
import {GridElement} from "./ui/GridElement";
import {GridKernel} from "./ui/GridKernel";
import {AbsWidgetBase} from "./ui/Widget";
import {EventEmitterBase} from "./ui/internal/EventEmitter";
import {command, variable, routine, renderer, visualize} from "./ui/Extensibility";
import {ClipboardExtension} from "./extensions/common/ClipboardExtension";
import {EditingExtension, GridChangeSet} from "./extensions/common/EditingExtension";
import {ScrollerExtension} from "./extensions/common/ScrollerExtension";
import {SelectorExtension} from "./extensions/common/SelectorExtension";
import {HistoryExtension} from "./extensions/history/HistoryExtension";
import {DefaultHistoryManager} from "./extensions/history/HistoryManager";
import {ComputeEngine} from "./extensions/compute/ComputeEngine";
import {ComputeExtension} from "./extensions/compute/ComputeExtension";
import {JavaScriptComputeEngine} from "./extensions/compute/JavaScriptComputeEngine";
import {WatchManager} from "./extensions/compute/WatchManager";
import {ClickZoneExtension} from "./extensions/extra/ClickZoneExtension";
import {Base26} from "./misc/Base26";


(function(ext:any) {

    ext.ClipboardExtension = ClipboardExtension;
    ext.EditingExtension = EditingExtension;    
    ext.ScrollerExtension = ScrollerExtension;
    ext.SelectorExtension = SelectorExtension;
    ext.HistoryExtension = HistoryExtension;
    ext.DefaultHistoryManager = DefaultHistoryManager;
    ext.ComputeExtension = ComputeExtension;
    ext.JavaScriptComputeEngine = JavaScriptComputeEngine;
    ext.WatchManager = WatchManager;
    ext.ClickZoneExtension = ClickZoneExtension;
    ext.Point = Point;
    ext.Rect = Rect;
    ext.Base26 = Base26;
    ext.DefaultGridCell = DefaultGridCell;
    ext.DefaultGridColumn = DefaultGridColumn;
    ext.DefaultGridModel = DefaultGridModel;
    ext.DefaultGridRow = DefaultGridRow;
    ext.Style = Style;
    ext.StyledGridCell = StyledGridCell;
    ext.GridChangeSet = GridChangeSet;
    ext.GridRange = GridRange;
    ext.GridElement = GridElement;
    ext.GridKernel = GridKernel;
    ext.AbsWidgetBase = AbsWidgetBase;
    ext.EventEmitterBase = EventEmitterBase;
    ext.command = command;
    ext.variable = variable;
    ext.routine = routine;
    ext.renderer = renderer;
    ext.visualize = visualize;
    
})(window['cattle'] || (window['cattle'] = {}));