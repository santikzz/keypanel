import { useState } from "react"
import { Package, Plus, Edit, ChevronDown } from "lucide-react"

import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Switch } from "@/Components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/ui/collapsible"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/Components/ui/dialog"
import { Label } from "@/Components/ui/label"
import { Input } from "@/Components/ui/input"

export function ResellerApplications({ reseller, applications }: { reseller: object, applications: object[] }) {

    const _applications = [
        {
            id: 1,
            name: "Premium Analytics Suite",
            hasAccess: true,
            timeOptions: [
                { id: 1, name: "1 Month", duration: 30, cost: 50 },
                { id: 2, name: "6 Months", duration: 180, cost: 250 },
                { id: 3, name: "1 Year", duration: 365, cost: 450 },
            ],
        },
        {
            id: 2,
            name: "Advanced CRM Tool",
            hasAccess: true,
            timeOptions: [
                { id: 1, name: "3 Months", duration: 90, cost: 100 },
                { id: 2, name: "1 Year", duration: 365, cost: 350 },
            ],
        },
        {
            id: 3,
            name: "Cloud Storage Solution",
            hasAccess: false,
            timeOptions: [],
        }
    ];

    const [editTimeOptionOpen, setEditTimeOptionOpen] = useState(false)
    const [selectedApp, setSelectedApp] = useState(null)

    const openEditTimeOption = (app) => {
        setSelectedApp(app)
        setEditTimeOptionOpen(true)
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Application Access</CardTitle>
                    <CardDescription>Manage reseller access to applications and license creation options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {_applications?.map((app) => (
                        <Collapsible key={app.id} className="border rounded-md">
                            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 font-medium">
                                <div className="flex items-center">
                                    <Package className="h-4 w-4 mr-2" />
                                    {app.name}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="px-4 pb-4 pt-0 space-y-2">
                                {app.hasAccess ? (
                                    <>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Duration (days)</TableHead>
                                                    <TableHead>Cost</TableHead>
                                                    <TableHead className="text-right">Action</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {app.timeOptions.map((option) => (
                                                    <TableRow key={option.id}>
                                                        <TableCell>{option.name}</TableCell>
                                                        <TableCell>{option.duration}</TableCell>
                                                        <TableCell>${option.cost.toFixed(2)}</TableCell>
                                                        <TableCell className="text-right">
                                                            <Button variant="ghost" size="sm" onClick={() => openEditTimeOption(app)}>
                                                                <Edit className="h-4 w-4" />
                                                                <span className="sr-only">Edit</span>
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        <Button variant="outline" size="sm" onClick={() => openEditTimeOption(app)}>
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Time Option
                                        </Button>
                                    </>
                                ) : (
                                    <p className="text-sm text-muted-foreground">Access is disabled for this application.</p>
                                )}
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </CardContent>
            </Card>

            <Dialog open={editTimeOptionOpen} onOpenChange={setEditTimeOptionOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Time Option</DialogTitle>
                        <DialogDescription>Modify or add a time option for {selectedApp?.name}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="option-name">Name</Label>
                            <Input id="option-name" placeholder="e.g., 1 Month" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="option-duration">Duration (days)</Label>
                            <Input id="option-duration" type="number" placeholder="e.g., 30" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="option-cost">Cost</Label>
                            <Input id="option-cost" type="number" placeholder="e.g., 50" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditTimeOptionOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => setEditTimeOptionOpen(false)}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


        </>
    );

}